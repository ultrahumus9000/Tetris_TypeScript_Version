import React from "react";
import useSwitch from "../Hooks/mode";
import { createMiniGrids } from "../helper";

export default function Aside() {
  const { mode, toggleMode } = useSwitch((store) => {
    let { mode, toggleMode } = store;
    return { mode, toggleMode };
  });

  return (
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
        <p className="label">History Score</p>
        <p className={`actual`}>5000</p>
        <p className="label">Current Row</p>
        <p className={`actual`}>0</p>
        <p className="label">Level</p>
        <p className={`actual`}>1</p>
        <p className="label">Next Piece</p>
        <section className="mini-board">
          {createMiniGrids().map((row, index) => {
            return row.map((cell, index) => <div className="cell"></div>);
          })}
        </section>
      </div>
      <div className="panel">
        <button
          className={`${mode === "Light" ? "button-light" : "button-dark"}`}
        >
          Next Level
        </button>
        <button
          className={`${mode === "Light" ? "button-light" : "button-dark"}`}
        >
          Restart
        </button>
      </div>
    </aside>
  );
}
