import React, { useState, useEffect } from 'react';
import MineCell from './MineCell';

const MineTable = ({ width, height }) => {
  const createBoard = (rows, cols) => {
    let board = [];
    for (let i = 0; i < rows; i++) {
      let row = [];
      for (let j = 0; j < cols; j++) {
        row.push({ isMine: false, isRevealed: false, neighborMines: 0 });
      }
      board.push(row);
    }
    return board;
  };

  const initializeBoard = () => {
    const newBoard = createBoard(width, height);
    const totalCells = width * height;
    const totalMines = Math.floor(totalCells / 10); // Bombák száma = terület tizede
    let placedMines = 0;

    while (placedMines < totalMines) {
      const randomRow = Math.floor(Math.random() * width);
      const randomCol = Math.floor(Math.random() * height);
      if (!newBoard[randomRow][randomCol].isMine) {
        newBoard[randomRow][randomCol].isMine = true;
        placedMines++;
      }
    }

    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        if (!newBoard[i][j].isMine) {
          let mines = 0;
          for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
              if (i + x >= 0 && i + x < width && j + y >= 0 && j + y < height && newBoard[i + x][j + y].isMine) {
                mines++;
              }
            }
          }
          newBoard[i][j].neighborMines = mines;
        }
      }
    }
    return newBoard;
  };

  const checkWinCondition = (newBoard) => {
    for (let row of newBoard) {
      for (let cell of row) {
        if (!cell.isMine && !cell.isRevealed) {
          return false;
        }
      }
    }
    return true;
  };

  const [board, setBoard] = useState(initializeBoard());
  const [gameOver, setGameOver] = useState(false);
  const [time, setTime] = useState(0); // Timer state
  const [isRunning, setIsRunning] = useState(false); // Timer running state

  const revealAllMines = (newBoard) => {
    newBoard.forEach((row) => {
      row.forEach((cell) => {
        if (cell.isMine) {
          cell.isRevealed = true;
        }
      });
    });
  };

  const revealCell = (row, col) => {
    if (gameOver) return;

    const newBoard = [...board];
    const revealEmptyCells = (r, c) => {
      if (r < 0 || r >= height || c < 0 || c >= width || newBoard[r][c].isRevealed || newBoard[r][c].isMine) {
        return;
      }
      newBoard[r][c].isRevealed = true;
      if (newBoard[r][c].neighborMines === 0) {
        revealEmptyCells(r - 1, c);
        revealEmptyCells(r + 1, c);
        revealEmptyCells(r, c - 1);
        revealEmptyCells(r, c + 1);
        revealEmptyCells(r - 1, c - 1);
        revealEmptyCells(r - 1, c + 1);
        revealEmptyCells(r + 1, c - 1);
        revealEmptyCells(r + 1, c + 1);
      }
    };

    if (newBoard[row][col].isMine) {
      setGameOver(true);
      setIsRunning(false); // Stop the timer
      revealAllMines(newBoard);
      alert('You hit a mine! Game over!');
    } else {
      revealEmptyCells(row, col);
    }

    newBoard[row][col].isRevealed = true;

    if (checkWinCondition(newBoard)) {
      setGameOver(true);
      setIsRunning(false); // Stop the timer
      revealAllMines(newBoard);
      alert(`Congratulations! You cleared the board in ${time} seconds!`);
    }

    setBoard(newBoard);
  };

  const resetGame = () => {
    setBoard(initializeBoard());
    setGameOver(false);
    setTime(0); // Reset the timer
    setIsRunning(false); // Stop the timer until the first move
  };

  useEffect(() => {
    if (isRunning) {
      const timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isRunning]);

  useEffect(() => {
    // Start the timer when the game begins
    if (!gameOver && time === 0 && board.some((row) => row.some((cell) => cell.isRevealed))) {
      setIsRunning(true);
    }
  }, [board, gameOver, time]);

  return (
    <div>
      <h2>Timer: {time}s</h2>
      {board.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex' }}>
          {row.map((cell, colIndex) => (
            <MineCell
              key={colIndex}
              cell={cell}
              onClick={() => revealCell(rowIndex, colIndex)}
            />
          ))}
        </div>
      ))}
      {gameOver && (
        <div>
          <button onClick={resetGame}>Try Again</button>
        </div>
      )}
    </div>
  );
};

export default MineTable;
