export function randomTetriminos() {
  const tetriminos = [
    {
      shape: [[1], [1], [1], [1]],
      x: 0,
      y: 0,
      color: "white",
    },
    {
      shape: [
        ["", 2],
        ["", 2],
        [2, 2],
      ],
      x: 0,
      y: 0,
      color: "pink",
    },
    {
      shape: [
        [3, ""],
        [3, ""],
        [3, 3],
      ],
      x: 0,
      y: 0,
      color: "cyan",
    },
    {
      shape: [
        [4, 4],
        [4, 4],
      ],
      x: 0,
      y: 0,
      color: "yellow",
    },
    {
      shape: [
        ["", 5, 5],
        [5, 5, ""],
      ],
      x: 0,
      y: 0,
      color: "red",
    },
    {
      shape: [
        [6, 6, ""],
        ["", 6, 6],
      ],
      x: 0,
      y: 0,
      color: "green",
    },
    {
      shape: [
        [7, 7, 7],
        ["", 7, ""],
      ],
      x: 0,
      y: 0,
      color: "purple",
    },
  ];

  let randomTetrominosPiece =
    tetriminos[Math.floor(Math.random() * tetriminos.length)];
  randomTetrominosPiece.x = Math.floor(Math.random() * 8);
  return randomTetrominosPiece;
}
