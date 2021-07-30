import React from "react";
import useSwitch from "../Hooks/mode";
import { useMusic } from "../Hooks/music";

import { backgroundMusic } from "../App";

export default function ControlPanel() {
  const mode = useSwitch((store) => store.mode);
  const music = useMusic((store) => store.music);
  const playMusic = useMusic((store) => store.playMusic);
  const stopMusic = useMusic((store) => store.stopMusic);
  return (
    <div>
      <h2
        className={`game-name ${
          mode === "Light" ? "light-gamename" : "dark-gamename"
        }`}
      >
        Tetris
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
        >
          Rotate
        </button>
        <button
          value="right"
          className={`right ${
            mode === "Light" ? "light-right" : "dark-right"
          } `}
        >
          Right
        </button>
        <button
          value="left"
          className={`left ${mode === "Light" ? "light-left" : "dark-left"} `}
        >
          Left
        </button>
        <button
          value="down"
          className={`down ${mode === "Light" ? "light-down" : "dark-down"} `}
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
                  console.log(error);
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
    </div>
  );
}
