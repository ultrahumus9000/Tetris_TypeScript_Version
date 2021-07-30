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
export default function MiniCell({ color, nextPiece, miniBoardX, miniBoardY }) {
  let cellColor = colors[color];

  //   if (piece.x === boardX && piece.y === boardY) {
  //     cellColor = piece.color;
  //   }
  let copyPiece = JSON.parse(JSON.stringify(nextPiece));
  copyPiece.x = 0;

  for (let y = 0; y < copyPiece.shape.length; y++) {
    for (let x = 0; x < copyPiece.shape[0].length; x++) {
      // 1 if cell in shape isnt empty 2 it matches the coodinate matched the board then we can have the matched color of piece
      let offsetY = y;
      if (copyPiece.shape.length <= 3) {
        offsetY = offsetY + 1;
      }
      if (
        nextPiece.shape[y][x] !== "" &&
        x + 1 === miniBoardX &&
        offsetY === miniBoardY
      ) {
        cellColor = nextPiece.color;
      }
    }
  }

  return <div className={`cell ${cellColor}`}></div>;
}
