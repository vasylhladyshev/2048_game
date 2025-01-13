'use strict';

import Game from './Game.class.js';

const game = new Game();
const startButton = document.querySelector('.button.start');
const messageLose = document.querySelector('.message-lose');
const messageWin = document.querySelector('.message-win');
const messageStart = document.querySelector('.message-start');

startButton.addEventListener('click', () => {
  if (game.getStatus() === 'idle') {
    game.start();
    updateBoard();
    startButton.textContent = 'Restart';
    messageStart.classList.add('hidden');
  } else {
    game.restart();
    updateBoard();
    messageLose.classList.add('hidden');
    messageWin.classList.add('hidden');
  }
});

function updateCell(cell, value) {
  cell.classList.remove(
    ...Array.from(cell.classList).filter((cls) => cls.startsWith('value-')),
  );

  if (value > 0) {
    cell.classList.add(`value-${value}`);
    cell.textContent = value;
  } else {
    cell.textContent = '';
  }
}

function updateBoard() {
  const board = game.getState();
  const cells = document.querySelectorAll('.field-cell');

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const value = board[i][j];
      const cellIndex = i * 4 + j;

      const cell = cells[cellIndex];

      updateCell(cell, value);
    }
  }
}

document.addEventListener('keydown', (e) => {
  if (game.getStatus() !== 'playing') {
    return;
  }

  switch (e.key) {
    case 'ArrowUp':
      game.moveUp();
      updateBoard();
      break;
    case 'ArrowDown':
      game.moveDown();
      updateBoard();
      break;
    case 'ArrowLeft':
      game.moveLeft();
      updateBoard();
      break;
    case 'ArrowRight':
      game.moveRight();
      updateBoard();
      break;
  }
});
