const Utils = require('../../utils');

const rawGrid = Utils.Input.strToLines(Utils.Input.getInput());
const grid = new Map();

const TO_THE_EAST = '>';
const TO_THE_SOUTH = 'v';
const EMPTY = '.';
const MAX_Y = rawGrid.length - 1;
const MAX_X = rawGrid[0].split('').length - 1;

const coords = (x, y) => `${x}-${y}`;

const processGrid = (instructions) => {
  instructions.forEach((oldSet, newSet) => {
    const cell = grid.get(oldSet);

    grid.delete(oldSet);
    grid.set(newSet, cell);
  });
};

Utils.Input.strToLines(Utils.Input.getInput()).forEach((line, y) =>
  line.split('').forEach((cell, x) => {
    if (cell !== EMPTY) {
      grid.set(coords(x, y), cell);
    }
  }),
);

let moving = true;
let step = 0;

while (moving) {
  const eastInstructions = new Map();
  const southInstructions = new Map();

  for (let y = MAX_Y; y >= 0; y--) {
    for (let x = 0; x <= MAX_X; x++) {
      const curCoords = coords(x, y);

      if (grid.has(curCoords)) {
        const dir = grid.get(curCoords);

        if (dir === TO_THE_EAST) {
          const nextX = x === MAX_X ? 0 : x + 1;
          const newCoords = coords(nextX, y);
          const occupied = grid.has(newCoords) || eastInstructions.has(newCoords);

          if (!occupied) {
            eastInstructions.set(newCoords, curCoords);
          }
        }
      }
    }
  }

  processGrid(eastInstructions);

  for (let y = MAX_Y; y >= 0; y--) {
    for (let x = 0; x <= MAX_X; x++) {
      const curCoords = coords(x, y);

      if (grid.has(curCoords)) {
        const dir = grid.get(curCoords);

        if (dir === TO_THE_SOUTH) {
          const nextY = y === MAX_Y ? 0 : y + 1;
          const newCoords = coords(x, nextY);
          const occupied = grid.has(newCoords) || southInstructions.has(newCoords);

          if (!occupied) {
            southInstructions.set(newCoords, curCoords);
          }
        }
      }
    }
  }

  processGrid(southInstructions);

  if (eastInstructions.size === 0 && southInstructions.size === 0) {
    moving = false;
  }

  step++;
}

let partOne = step;

Utils.Output.outResult(partOne);
