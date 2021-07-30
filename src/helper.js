import { useMusic } from "./Hooks/music";
export default function createGrids() {
  let arrayColumn = Array(12).fill("");
  let arrayRows = Array(20).fill("");
  let innitialBoard = arrayRows.map((row) => {
    return arrayColumn.map((col) => "");
  });
  return innitialBoard;
}

export const createMiniGrids = () => {
  const arrayRow = Array(4).fill("");
  let innitialBoard = arrayRow.map((row) => {
    return arrayRow.map((col) => "");
  });
  return innitialBoard;
};

export const postRecord = (count) => {
  fetch(" http://localhost:4000/score", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      history: count * 20,
    }),
  });
};

export const findHighestScore = (historyArray) => {
  let scoreArray = historyArray.map((score) => score.history);
  return Math.max(...scoreArray);
};
