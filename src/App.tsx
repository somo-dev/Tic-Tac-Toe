import { useState } from "react";
import "./App.css";
import TicTacToe from "./components/tic-tac-toe";

function App() {
  return (
    <>
      <div>
        <TicTacToe boardSize={4} />
      </div>
    </>
  );
}

export default App;
