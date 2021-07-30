import React from "react";

const colors = {
  1: "white",
  2: "pink",
  3: "cyan",
  4: "yellow",
  5: "red",
  6: "green",
  7: "purple",
};
export default function Cell({ color, piece, boardX, boardY }) {
  let cellColor = colors[color];

  //   if (piece.x === boardX && piece.y === boardY) {
  //     cellColor = piece.color;
  //   }

  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[0].length; x++) {
      let offsetX = piece.x + x;
      let offsetY = piece.y + y;
      // 1 if cell in shape isnt empty 2 it matches the coodinate matched the board then we can have the matched color of piece
      if (
        piece.shape[y][x] !== "" &&
        offsetX === boardX &&
        offsetY === boardY
      ) {
        cellColor = piece.color;
      }
    }
  }

  return <div className={`cell ${cellColor}`}></div>;
}
