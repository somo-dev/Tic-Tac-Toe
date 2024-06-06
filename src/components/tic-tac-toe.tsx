import React, { FC } from "react";
import useTicToe from "../hooks/use-tic-tac-toe";

interface TicTacToePropsType {
  boardSize?: number;
}

const TicTacToe: FC<TicTacToePropsType> = ({ boardSize = 3 }) => {
  const { board, getWinner, getStatus, handleButtonClick, handleReset } =
    useTicToe(boardSize);

  return (
    <div
      className="game"
      style={{ "--board-size": boardSize } as React.CSSProperties}
    >
      <div className="status">
        <b>{getStatus()}</b>
        <button className="reset" onClick={handleReset}>
          Reset Game
        </button>
      </div>
      <div className="board">
        {board.map((b, index) => (
          <button
            key={index}
            className="cell"
            onClick={() => handleButtonClick(index)}
            disabled={b !== null}
          >
            {b}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TicTacToe;
