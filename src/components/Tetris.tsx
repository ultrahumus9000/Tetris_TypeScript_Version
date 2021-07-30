import React from "react";
import { useCallback, useEffect, useState } from "react";

import createGrids from "../helper";
import useSwitch from "../Hooks/mode";

import { randomTetriminos } from "../Hooks/tetrominos";
import Cell from "./Cell";
import useGame from "../Hooks/useGame";
import { createMiniGrids } from "../helper";
import MiniCell from "./MiniCell";
import { postRecord, findHighestScore } from "../helper";
import { useGameHistory } from "../Hooks/useGameHistory";
import { useMusic } from "../Hooks/music";
import { backgroundMusic } from "../App";

export default function GameStart() {
  const { mode, toggleMode } = useSwitch((store) => {
    let { mode, toggleMode } = store;
    return { mode, toggleMode };
  });
  const music = useMusic((store) => store.music);
  const playMusic = useMusic((store) => store.playMusic);
  const stopMusic = useMusic((store) => store.stopMusic);

  const gameOver = useGame((store) => store.gameOver);
  const stopGame = useGame((store) => store.stopGame);
  const startGame = useGame((store) => store.startGame);
  const [piece, setPiece] = useState(randomTetriminos());
  const [board, setBoard] = useState(createGrids());
  const [nextPiece, setNextPiece] = useState(randomTetriminos());
  const [miniBoard, setMiniBoard] = useState(createMiniGrids());
  const [count, setCount] = useState(0);
  const [row, setRow] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [level, setLevel] = useState(1);
  const [paused, setPaused] = useState(false);
  const history = useGameHistory((store) => store.history);
  const fetchHistory = useGameHistory((store) => store.fetchHistory);
  let highestScore = findHighestScore(history);
  let currentScore = count * 20;

  const placeOnBoard = useCallback(() => {
    let newBoard = JSON.parse(JSON.stringify(board));
    let newCount = count;
    for (
      let yRelativeToPiece = 0;
      yRelativeToPiece < piece.shape.length;
      yRelativeToPiece++
    ) {
      for (
        let xRelativeToPiece = 0;
        xRelativeToPiece < piece.shape[0].length;
        xRelativeToPiece++
      ) {
        let absoluteBoardX = piece.x + xRelativeToPiece;
        let absoluteBoardY = piece.y + yRelativeToPiece;
        if (piece.shape[yRelativeToPiece][xRelativeToPiece] !== "") {
          newBoard[absoluteBoardY][absoluteBoardX] =
            piece.shape[yRelativeToPiece][xRelativeToPiece];
        }
      }
    }
    if (newBoard[0].some((ele: string | number) => ele !== "")) {
      stopGame();
      postRecord(count);
      if (music) {
        backgroundMusic.pause();
        const gameOverMusic = new Audio("/gameover.wav");
        gameOverMusic.play();
      }
      return;
    }

    newBoard = newBoard.filter((row: (boolean | string)[]) =>
      row.some((cell) => cell === "")
    );
    let gap = board.length - newBoard.length;
    for (let i = 0; i < gap; i++) {
      newBoard.unshift(Array(12).fill(""));
      newCount++;
      if (music) {
        const gameOverMusic = new Audio("/clear.wav");
        gameOverMusic.play();
      }
    }
    let rowCount = newBoard.filter((row: (boolean | string)[]) =>
      row.every((cell) => cell === "")
    ).length;

    rowCount = 20 - rowCount;
    setRow(rowCount);
    setBoard(newBoard);
    newCount++;
    setCount(newCount);
    setNextPiece(randomTetriminos());
    setPiece(nextPiece);
    if (music) {
      const gameOverMusic = new Audio("/fall.wav");
      gameOverMusic.play();
    }
  }, [piece.shape, piece.x, piece.y, board, stopGame]);

  const willCollide = useCallback(
    (newX, newY, piece) => {
      if (!gameOver) {
        for (
          let yRelativeToPiece = 0;
          yRelativeToPiece < piece.shape.length;
          yRelativeToPiece++
        ) {
          for (
            let xRelativeToPiece = 0;
            xRelativeToPiece < piece.shape[0].length;
            xRelativeToPiece++
          ) {
            //check we are inside the game boarder, check we are actually on the cell,check we are gonna clear the bottom or not
            if (piece.shape[yRelativeToPiece][xRelativeToPiece] !== "") {
              let absoluteBoardX = piece.x + xRelativeToPiece;
              let absoluteBoardY = piece.y + yRelativeToPiece;
              if (
                board[absoluteBoardY + newY] === undefined ||
                board[absoluteBoardY + newY][absoluteBoardX + newX] ===
                  undefined ||
                board[absoluteBoardY + newY][absoluteBoardX + newX] !== ""
              ) {
                return true;
              }
            }
          }
        }
        return false;
      }
    },
    [piece.shape, piece.x, piece.y, board, gameOver]
  );

  const updatePiecePos = useCallback(
    (newX, newY) => {
      if (!gameOver) {
        if (!willCollide(newX, newY, piece)) {
          setPiece((piece) => ({
            ...piece,
            x: piece.x + newX,
            y: piece.y + newY,
          }));
        } else {
          if (newY > 0) {
            placeOnBoard();
          }
        }
        return null;
      }
    },
    [willCollide, gameOver, placeOnBoard]
  );
  useEffect(() => {
    fetchHistory();
  }, [currentScore]);

  useEffect(() => {
    if (paused) {
      return;
    }
    if (count >= 15) {
      setSpeed(0.7);
    }
    let timeInterval = (1000 / level) * speed;
    console.log(timeInterval);
    let clearId = setInterval(() => {
      updatePiecePos(0, 1);
    }, timeInterval);
    return () => {
      clearInterval(clearId);
    };
  }, [updatePiecePos, paused]);

  useEffect(() => {
    if (paused) return;
    document.addEventListener("keydown", moveKey);
    return () => document.removeEventListener("keydown", moveKey);
  }, [piece, paused]);

  function restart() {
    startGame();
    setPiece(randomTetriminos());
    setNextPiece(randomTetriminos());
    setCount(0);
    setBoard(createGrids());
    setSpeed(1);
    setRow(0);
    if (music) {
      backgroundMusic.play();
    }
    setPaused(false);
  }

  function movePiece(e) {
    if (!gameOver && !paused) {
      if (e.target.value === "left") {
        if (music) {
          const pressMusic = new Audio("../../press.mp3");
          pressMusic.volume = 0.3;
          pressMusic.play();
        }
        updatePiecePos(-1, 0);
      }
      if (e.target.value === "right") {
        if (music) {
          const pressMusic = new Audio("../../press.mp3");
          pressMusic.play();
          pressMusic.volume = 0.3;
        }
        updatePiecePos(1, 0);
      }
      if (e.target.value === "down") {
        if (music) {
          const pressMusic = new Audio("../../press.mp3");
          pressMusic.play();
          pressMusic.volume = 0.3;
        }
        updatePiecePos(0, 1);
      }
    }
  }

  function rotatePiece() {
    if (!gameOver && !paused) {
      let copyPiece = JSON.parse(JSON.stringify(piece));
      let copyPieceShape = copyPiece.shape;
      let rotatePieceShape = [];
      for (let x = 0; x < copyPieceShape[0].length; x++) {
        let row = [];
        for (let y = 0; y < copyPieceShape.length; y++) {
          row.unshift(copyPieceShape[y][x]);
        }
        rotatePieceShape.push(row);
      }
      console.log(rotatePieceShape);
      let rotatePiece = { shape: rotatePieceShape, x: piece.x, y: piece.y };
      if (!willCollide(0, 0, rotatePiece)) {
        setPiece({ ...piece, shape: rotatePieceShape });
        if (music) {
          const pressMusic = new Audio("../../press.mp3");
          pressMusic.play();
          pressMusic.volume = 0.3;
        }
      }
    }
    return;
  }

  function moveKey(e) {
    console.log("move key", e);
    if (!gameOver && !paused) {
      if (e.key === "ArrowLeft") {
        if (music) {
          const pressMusic = new Audio("../../press.mp3");
          pressMusic.play();
          pressMusic.volume = 0.3;
        }
        updatePiecePos(-1, 0);
      }
      if (e.key === "ArrowRight") {
        if (music) {
          const pressMusic = new Audio("../../press.mp3");
          pressMusic.play();
          pressMusic.volume = 0.3;
        }
        updatePiecePos(1, 0);
      }
      if (e.key === "ArrowDown") {
        if (music) {
          const pressMusic = new Audio("../../press.mp3");
          pressMusic.play();
          pressMusic.volume = 0.3;
        }
        updatePiecePos(0, 1);
      }
      if (e.key === "ArrowUp") {
        if (music) {
          const pressMusic = new Audio("press.mp3");
          pressMusic.play();
          pressMusic.volume = 0.3;
        }
        rotatePiece();
      }
    }
  }

  return (
    <>
      <aside>
        <button className={`mode ${mode}`} onClick={toggleMode}>
          {`Current Mode: ${mode}`}
        </button>
        <div
          className={`information-board ${
            mode === "Light"
              ? "information-board-light"
              : "information-board-dark"
          } `}
        >
          <div className="score-section">
            <section className="current-score-section">
              <p className="label">Score </p>
              <p className={`actual`}>{currentScore}</p>
            </section>
            <section className="high-score-section">
              <p className="label">highest Score </p>
              <p className={`actual`}>{highestScore}</p>
            </section>
          </div>
          <p className="label">Current Row</p>
          <p className={`actual`}>{row}</p>
          <p className="label">Level</p>
          <p className={`actual`}>{level}</p>
          <p className="label">Next Piece</p>
          <section className="mini-board">
            {miniBoard.map((row, y) => {
              return row.map((cell, x) => (
                <MiniCell
                  color={cell}
                  nextPiece={nextPiece}
                  miniBoardX={x}
                  miniBoardY={y}
                  className="cell"
                />
              ));
            })}
          </section>
        </div>
        <div className="panel">
          <button
            className={`${mode === "Light" ? "button-light" : "button-dark"}`}
            onClick={() => {
              setLevel(level + 1);
            }}
          >
            Next Level
          </button>

          <button
            className={`${mode === "Light" ? "button-light" : "button-dark"}`}
            onClick={restart}
          >
            Restart
          </button>
        </div>
      </aside>

      <div
        className={`board ${mode === "Light" ? "board-light" : "board-dark"}`}
      >
        <section className="modal">
          {gameOver ? (
            currentScore > highestScore ? (
              <div className="modal">
                <section className="score-grid-board">
                  <h1 className="history-score-board-label">Highest Score</h1>
                  <h1 className="history-score-board"> {currentScore}</h1>
                </section>
              </div>
            ) : null
          ) : null}
        </section>
        <section className="grid-board">
          {board.map((row, y) => {
            return row.map((color, x) => (
              <Cell
                color={color}
                key={`${y},${x}`}
                piece={piece}
                boardX={x}
                boardY={y}
              ></Cell>
            ));
          })}
        </section>
      </div>
      <div>
        <h2
          className={`game-name ${
            mode === "Light" ? "light-gamename" : "dark-gamename"
          } ${gameOver ? "game-over" : "Tetris"} `}
        >
          {` ${gameOver ? "" : "Tetris"}`}
          {gameOver ? null : (
            <svg
              id="prefix__Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              x={0}
              y={0}
              viewBox="0 0 491.8 491.8"
              xmlSpace="preserve"
              width={120}
            >
              <style>{".prefix__st32{fill:#e9585b}"}</style>
              <path
                className="prefix__st32"
                d="M289.1 86.5c11.5.4 22.3 5.8 30.4 16.6 5.9 7.8 12.6 14.5 23.3 15.2 14.2.9 24.2-6.1 26.3-21 1-7.4 4.6-7.5 9.8-7.1 7.8.7 3.2 6.1 2.8 8.9-2.3 14.4-9.7 25.7-24 30.2-14.6 4.6-28.2 1.7-39.6-9-3.1-2.9-6-6.2-8.6-9.6-8-10.6-18.8-13.5-30.9-10.1-11.7 3.2-14.8 13.3-16.1 23.9-.5 3.6.4 7.3-5.5 7.2-5.2-.1-7.6-.9-7.2-7 1.1-23 15.8-38.3 39.3-38.2zM256.1 154.4c-2.3 0-4.7.4-6.9-.1-3.4-.7-9.1 3.1-9.1-4.8 0-6.3.2-12.3 8-13.6 4.2-.7 8.5-.6 12.8-.4 8.3.4 11 5.2 10.8 13.2-.2 9.2-6.7 4.6-10.7 5.6-1.5.4-3.3.1-4.9.1zM361.9 173.2c-19.5-.1-39.1 0-58.6 0-4.6 0-9.1 1-8.9-6.6.2-5.5-4.4-7.4-9.8-7.4-19.2.2-38.4.2-57.6.2-5.5 0-9.6 2.2-9.7 7.6-.1 6.6-3.7 6.3-8.3 6.2-21.2-.1-42.4-.6-63.6.1-42.2 1.4-78.5 31.2-89.2 72.4-10.7 40.9 6.7 84.4 42.6 106.9 35.8 22.4 84.7 20.5 113.9-9.6 15.8-16.2 31.4-19.8 51.2-18 2.6.2 5.3.3 7.9 0 6.5-.8 10.7 1.6 15 6.8 19.2 23.3 44.4 34.9 65.2 35.2 62.8 0 106.3-43 106.6-96.2.4-53.7-42.7-97.3-96.7-97.6zM183.1 287.3c-17.6 0-17.9.3-17.9 17.9 0 6.8-1.9 10.1-9 9.2-.7-.1-1.3 0-2 0-21.8.2-21.9.2-22.8-21.3-.2-4.7-1.4-6-6.2-6.1-21-.7-20.5-.9-21.1-21.8-.3-9.5 2.6-13.4 12.2-11.9 2.9.4 6-.2 8.9.1 4.9.6 5.9-1.6 6.1-6.2.8-21.3 1-20.9 22.8-21.4 9.1-.2 12.1 3 10.9 11.5-.2 1.6.2 3.4-.1 5-1.7 9.2 2.2 11.7 11.2 11.3 17.9-.6 15.8-2.7 16 16.6 0 2.7-.2 5.3 0 8 .9 6.9-2.1 9.1-9 9.1zm65.7 11c-.3 4-3.2 5.4-6.9 5.4h-9.8v-.1h-10.8c-3.8-.1-6.4-2-6.3-5.9.1-3.8 2.7-5.9 6.5-6 6.9-.1 13.8-.1 20.7 0 4.1.1 6.9 2.2 6.6 6.6zm47.8.1c-.3 3.9-3.2 5.4-7 5.3-3.3-.1-6.6 0-9.9 0v-.1h-9.9c-4.2 0-7.3-1.5-7.2-6.1.1-3.8 2.9-5.8 6.6-5.9 6.9-.1 13.8-.1 20.7 0 4.4.1 7 2.5 6.7 6.8zm40.2-77.1c10.9-.1 20.3 9.3 20.2 20.1-.1 10.9-9.6 20.1-20.5 19.9-11-.2-19.9-9.6-19.5-20.7.3-10.7 9-19.2 19.8-19.3zm-.2 94.3c-11.1-.1-19.9-9.3-19.5-20.4.4-10.6 9.2-19.3 19.7-19.5 10.7-.1 20.3 9.5 20.2 20.2-.1 10.9-9.3 19.8-20.4 19.7zm55.5-94.2c11-.2 20.4 8.7 20.5 19.7.1 10.9-9.2 20.2-20.1 20.2-11 0-20-9.2-19.9-20.2.1-10.8 8.8-19.5 19.5-19.7zm1 94.2c-11.3.3-20.4-8.6-20.4-19.8 0-10.7 8.8-19.8 19.4-20.1 10.8-.3 20.5 9.2 20.6 20 0 10.6-8.8 19.6-19.6 19.9z"
              />
            </svg>
          )}
        </h2>

        <section
          className={`control-panel ${
            mode === "Light" ? "light-control-panel" : "dark-control-panel"
          } `}
        >
          <button
            value="Rotate"
            className={`rotate ${
              mode === "Light" ? "light-rotate" : "dark-rotate"
            } `}
            onClick={rotatePiece}
          >
            Rotate
          </button>
          <button
            value="right"
            className={`right ${
              mode === "Light" ? "light-right" : "dark-right"
            } `}
            onClick={movePiece}
          >
            Right
          </button>
          <button
            value="left"
            className={`left ${mode === "Light" ? "light-left" : "dark-left"} `}
            onClick={movePiece}
          >
            Left
          </button>
          <button
            value="down"
            className={`down ${mode === "Light" ? "light-down" : "dark-down"} `}
            onClick={movePiece}
          >
            Down
          </button>
        </section>
        <section className="music-section">
          {music ? (
            <button
              className="music-button"
              onClick={() => {
                stopMusic();
                backgroundMusic.pause();
              }}
            >
              Stop Music
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={32}
                height={32}
                viewBox="0 0 8.467 8.467"
              >
                <path
                  d="M5.82 3.485a.794.794 0 01.265-.045.794.794 0 01.794.793.794.794 0 01-.794.794.794.794 0 01-.265-.045"
                  fill="#e2e7fa"
                />
                <path
                  d="M5.82.794L3.176 2.91h-.794a.792.792 0 00-.793.794v1.058c0 .44.354.794.793.794h.794l2.646 2.117z"
                  fill="#a8c5f7"
                />
                <path d="M5.82.794l-.528.423V7.25l.529.423z" fill="#91b8fb" />
                <path
                  d="M5.82.794L3.176 2.91h.53L5.82 1.217zM2.381 2.91a.792.792 0 00-.793.794v1.058c0 .44.354.794.793.794h.53a.792.792 0 01-.794-.794V3.704c0-.44.354-.794.793-.794zM3.175 5.556l2.646 2.117V7.25L3.704 5.556z"
                  fill="#f8f8f8"
                />
                <path
                  d="M6.085 3.44a.794.794 0 00-.264.045v.001a.794.794 0 01.529.747.794.794 0 01-.53.748.794.794 0 00.265.046.794.794 0 00.794-.794.794.794 0 00-.794-.793z"
                  fill="#c4d2f0"
                />
                <path
                  style={{
                    lineHeight: "normal",
                    fontVariantLigatures: "normal",
                    fontVariantPosition: "normal",
                    fontVariantCaps: "normal",
                    fontVariantNumeric: "normal",
                    fontVariantAlternates: "normal",
                    fontFeatureSettings: "normal",
                    textIndent: 0,
                    textAlign: "start",
                    textDecorationLine: "none",
                    textDecorationStyle: "solid",
                    textDecorationColor: "#000",
                    textTransform: "none",
                    textOrientation: "mixed",
                    whiteSpace: "normal",
                    shapePadding: 0,
                    isolation: "auto",
                    mixBlendMode: "normal",
                    solidColor: "#000",
                    solidOpacity: 1,
                  }}
                  d="M5.655.588L3.083 2.645h-.7a1.057 1.057 0 00-1.06 1.06v1.056c0 .548.416.998.96 1.05L.61 7.48c-.249.25.125.624.375.374L3.02 5.821h.063l2.572 2.058a.265.265 0 00.43-.205V5.292c.592 0 1.059-.478 1.059-1.06 0-.581-.477-1.057-1.058-1.057v-.42l1.77-1.77C8.104.737 7.73.363 7.48.612L6.086 2.007V.793a.265.265 0 00-.43-.205zm-.1.758v1.19L2.802 5.293h-.419a.528.528 0 01-.53-.53V3.704c0-.294.233-.529.53-.53h.793c.06 0 .119-.02.166-.059zm0 1.94V7.12l-2.13-1.705zm.53.418a.529.529 0 110 1.058z"
                  color="#000"
                  fontWeight={400}
                  fontFamily="sans-serif"
                  overflow="visible"
                  fill="#66a0fe"
                />
              </svg>
            </button>
          ) : (
            <button
              className="music-button"
              onClick={() => {
                playMusic();
                backgroundMusic
                  .play()
                  .then(() => {
                    console.log("playing");
                  })
                  .catch((error) => {
                    console.log("playback prevented");
                  });
              }}
            >
              Play Music
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={48}
                height={36}
                viewBox="0 0 48 36"
              >
                <defs>
                  <style>{".prefix__a{fill:#a8c5f7}"}</style>
                </defs>
                <title>{"5 Sound_2"}</title>
                <path
                  className="prefix__a"
                  d="M21.18.62l-10.46 8A2 2 0 019.51 9H5a5 5 0 00-5 5v8a5 5 0 005 5h4.51a2 2 0 011.21.41l10.46 8A3 3 0 0026 33V3A3 3 0 0021.18.62zM40.43 33.43A2 2 0 0139 30a17 17 0 000-24 2 2 0 112.82-2.84 21 21 0 010 29.7 2 2 0 01-1.39.57z"
                />
                <path
                  className="prefix__a"
                  d="M34.78 27.78a2 2 0 01-1.41-3.41 9 9 0 000-12.74 2 2 0 012.82-2.82 13 13 0 010 18.38 2 2 0 01-1.41.59z"
                />
              </svg>
            </button>
          )}
        </section>
        <section className="pause-section">
          {paused ? (
            <button
              className="pause-button"
              onClick={() => {
                setPaused(false);
              }}
            >
              Play{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 57 57"
                xmlSpace="preserve"
                width="100px"
                height="40px"
              >
                <path
                  d="M29 27.528v-12.5c0-2.475 2.025-4.5 4.5-4.5h0c2.475 0 4.5 2.025 4.5 4.5v3.5c0 2.2 1.8 4 4 4h0c2.2 0 4-1.8 4-4v-16"
                  fill="none"
                  stroke="#38454f"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeMiterlimit={10}
                />
                <path
                  d="M45.241 55.471c-1.303.022-5.452-.268-9.314-1.331-4.514-1.242-10.121-1.237-14.637 0-3.892 1.066-7.521 1.354-9.314 1.331C5.142 55.383 0 48.52 0 41.499c0-7.684 6.287-13.972 13.972-13.972h29.274C50.93 27.528 57 33.815 57 41.499c0 7.021-4.925 13.856-11.759 13.972z"
                  fill="#cbd4d8"
                />
                <path
                  fill="none"
                  stroke="#afb6bb"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeMiterlimit={10}
                  d="M27 31.528L31.632 31.528"
                />
                <circle cx={36} cy={41.528} r={3} fill="#43b05c" />
                <circle cx={50} cy={41.528} r={3} fill="#dd352e" />
                <circle cx={43} cy={48.528} r={3} fill="#ebba16" />
                <circle cx={43} cy={34.528} r={3} fill="#366db6" />
                <path
                  fill="#38454f"
                  d="M22 38.528L18 38.528 18 34.528 12 34.528 12 38.528 8 38.528 8 44.528 12 44.528 12 48.528 18 48.528 18 44.528 22 44.528z"
                />
              </svg>
            </button>
          ) : (
            <button
              className="pause-button"
              onClick={() => {
                setPaused(true);
              }}
            >
              Pause
              <svg
                width="40px"
                height="40px"
                viewBox="0 0 104 104"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g
                  transform="translate(-1098 -903) translate(1100 905)"
                  stroke="#1565C0"
                  strokeWidth={3.5}
                  fill="none"
                  fillRule="evenodd"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle fill="#E2F3FB" cx={50} cy={50} r={50} />
                  <path d="M30 30h15v40H30V30zm25 0h15v40H55V30z" fill="#FFF" />
                </g>
              </svg>
            </button>
          )}
        </section>
      </div>
    </>
  );
}
// need to keep track pieces and already played
