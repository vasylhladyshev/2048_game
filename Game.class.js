'use strict';

export default class Game {
  constructor(initialState) {
    this.board = initialState || [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    this.score = 0;
    this.status = 'idle';
    this.addRandomTile();
  }

  addRandomTile() {
    const emptyCells = [];

    for (let rowIndex = 0; rowIndex < this.board.length; rowIndex++) {
      for (
        let colIndex = 0;
        colIndex < this.board[rowIndex].length;
        colIndex++
      ) {
        if (this.board[rowIndex][colIndex] === 0) {
          emptyCells.push({ row: rowIndex, col: colIndex });
        }
      }
    }

    if (emptyCells.length === 0) {
      return;
    }

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const { row, col } = emptyCells[randomIndex];

    this.board[row][col] = Math.random() < 0.1 ? 4 : 2;
  }

  moveLeft() {
    const shiftRowLeft = (row) => {
      const newRow = row.filter((value) => value !== 0);

      for (let i = 0; i < newRow.length - 1; i++) {
        if (newRow[i] === newRow[i + 1]) {
          newRow[i] *= 2;
          this.score += newRow[i];
          newRow.splice(i + 1, 1);
        }
      }

      while (newRow.length < 4) {
        newRow.push(0);
      }

      row.length = 0;
      row.push(...newRow);
    };

    for (const row of this.board) {
      shiftRowLeft(row);
    }

    this.addRandomTile();
    this.status = 'playing';
  }

  moveRight() {
    const shiftRowRight = (row) => {
      const newRow = row.filter((value) => value !== 0);

      for (let i = newRow.length - 1; i > 0; i--) {
        if (newRow[i] === newRow[i - 1]) {
          newRow[i] *= 2;
          this.score += newRow[i];
          newRow.splice(i - 1, 1);
        }
      }

      while (newRow.length < 4) {
        newRow.unshift(0);
      }

      row.length = 0;
      row.push(...newRow);
    };

    for (const row of this.board) {
      shiftRowRight(row);
    }

    this.addRandomTile();
    this.status = 'playing';
  }

  moveUp() {
    const shiftRowLeft = (row) => {
      const newRow = row.filter((value) => value !== 0);

      for (let i = 0; i < newRow.length - 1; i++) {
        if (newRow[i] === newRow[i + 1]) {
          newRow[i] *= 2;
          this.score += newRow[i];
          newRow.splice(i + 1, 1);
        }
      }

      while (newRow.length < 4) {
        newRow.push(0);
      }

      row.length = 0;
      row.push(...newRow);
    };

    const transposedBoard = this.board[0].map((_, colIndex) =>
      this.board.map((row) => row[colIndex])
    );

    for (const row of transposedBoard) {
      shiftRowLeft(row);
    }

    this.board = transposedBoard[0].map((_, colIndex) =>
      transposedBoard.map((row) => row[colIndex])
    );

    this.addRandomTile();
    this.status = 'playing';
  }

  moveDown() {
    const shiftRowRight = (row) => {
      const newRow = row.filter((value) => value !== 0);

      for (let i = newRow.length - 1; i > 0; i--) {
        if (newRow[i] === newRow[i - 1]) {
          newRow[i] *= 2;
          this.score += newRow[i];
          newRow.splice(i - 1, 1);
        }
      }

      while (newRow.length < 4) {
        newRow.unshift(0);
      }

      row.length = 0;
      row.push(...newRow);
    };

    const transposedBoard = this.board[0].map((_, colIndex) =>
      this.board.map((row) => row[colIndex])
    );

    for (const row of transposedBoard) {
      shiftRowRight(row);
    }

    this.board = transposedBoard[0].map((_, colIndex) =>
      transposedBoard.map((row) => row[colIndex])
    );

    this.addRandomTile();
    this.status = 'playing';
  }

  getScore() {
    return this.score;
  }

  getState() {
    return this.board;
  }

  getStatus() {
    if (this.status === 'idle') {
      return 'idle';
    }

    for (const row of this.board) {
      if (row.includes(2048)) {
        this.status = 'win';

        return 'win';
      }
    }

    for (const row of this.board) {
      if (row.includes(0)) {
        return this.status;
      }
    }

    for (let rowIndex = 0; rowIndex < this.board.length; rowIndex++) {
      for (
        let colIndex = 0;
        colIndex < this.board[rowIndex].length;
        colIndex++
      ) {
        const current = this.board[rowIndex][colIndex];

        if (
          this.board[rowIndex][colIndex + 1] === current ||
          (this.board[rowIndex + 1] &&
            this.board[rowIndex + 1][colIndex] === current)
        ) {
          return this.status;
        }
      }
    }

    this.status = 'lose';

    return 'lose';
  }

  start() {
    if (this.status === 'idle') {
      this.status = 'playing';
      this.addRandomTile();
    }
  }

  restart() {
    this.board = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    this.score = 0;
    this.status = 'idle';
    this.addRandomTile();
  }
}
