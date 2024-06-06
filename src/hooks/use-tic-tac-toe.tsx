import { useState } from "react";

const initialBoard = (boardSize: number) =>
  Array(boardSize * boardSize).fill(null);

const useTicToe = (boardSize: number) => {
  const [board, setBoard] = useState(initialBoard(boardSize));
  const [isXNext, setIsXNext] = useState(true);

  const generateWinningPattern = (boardSize: number) => {
    const patterns = [];
    for (let i = 0; i < boardSize; i++) {
      const horizantalPatterns = [];
      const verticalPatterns = [];
      for (let j = 0; j < boardSize; j++) {
        horizantalPatterns.push(i * boardSize + j);
        verticalPatterns.push(j * boardSize + i);
      }
      patterns.push(horizantalPatterns, verticalPatterns);
    }

    const diagonalOne = [];
    const diagonalTwo = [];

    for (let i = 0; i < boardSize; i++) {
      diagonalOne.push(i * (boardSize + 1));
      diagonalTwo.push((i + 1) * (boardSize - 1));
    }
    patterns.push(diagonalOne, diagonalTwo);

    return patterns;
  };

  const WINNING_PATTERNS = generateWinningPattern(boardSize);

  const getWinner = (currentBoard: (string | null)[]) => {
    for (let i = 0; i < WINNING_PATTERNS.length; i++) {
      //   const [a, b, c] = WINNING_PATTERNS[i];
      //   if (
      //     currentBoard[a] &&
      //     currentBoard[a] === currentBoard[b] &&
      //     currentBoard[b] === currentBoard[c]
      //   ) {
      //     return currentBoard[a];
      //   }
      // }
      const pattern = WINNING_PATTERNS[i];
      let countX = 0;
      let countY = 0;

      for (let j = 0; j < pattern.length; j++) {
        if (currentBoard[pattern[j]] === "X") {
          countX++;
        } else if (currentBoard[pattern[j]] === "O") {
          countY++;
        }
      }
      if (countX === boardSize) {
        return "X";
      }
      if (countY === boardSize) {
        return "Y";
      }
    }
  };

  const handleButtonClick = (index: number) => {
    const winner = getWinner(board);
    console.log(winner);
    if (winner || board[index] !== null) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const handleReset = () => {
    setBoard(initialBoard(boardSize));
    setIsXNext(true);
  };

  const getStatus = () => {
    const winner = getWinner(board);
    if (winner) return `Player ${winner} wins!!`;

    if (!board.includes(null)) {
      return "This is a DRAW!!";
    }
    return `Ptayer's ${isXNext ? " X" : " Y"}'s turn`;
  };

  return { board, getWinner, getStatus, handleButtonClick, handleReset };
};

export default useTicToe;
