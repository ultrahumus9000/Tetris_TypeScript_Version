import { Route } from "react-router";
import Aside from "./components/Aside";
import Board from "./components/Board";
import GameStart from "./components/Tetris";
import ControlPanel from "./components/Right";
import useSwitch from "./Hooks/mode";
import React from "react";

export const backgroundMusic = new Audio("/bgmusic.mp3");
backgroundMusic.loop = true;
backgroundMusic.volume = 0.7;
function App() {
  const mode = useSwitch((store) => store.mode);

  return (
    <div className={`App ${mode}`}>
      <Route path="/" exact>
        <Aside />
        <Board />
        <ControlPanel />
      </Route>
      <Route path="/tetris">
        <GameStart />
      </Route>
    </div>
  );
}

export default App;
