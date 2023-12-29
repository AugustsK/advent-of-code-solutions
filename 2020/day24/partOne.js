const { getInput, strToLines, lineToArr, lineToIntArr } = require('../../utils/input');
const { outResult, outDebug } = require('../../utils/output');

const DIRECTIONS = ['ne', 'e', 'se', 'sw', 'w', 'nw'];
const BLACK = 'black';
const WHITE = 'white';
const REFERENCE = [0, 0, 0];

const coordsToString = ([q, r, s]) => `${q}:${r}:${s}`;

const navigate = {
  ne: ([q, r, s]) => [q + 1, r - 1, s],
  e: ([q, r, s]) => [q + 1, r, s - 1],
  se: ([q, r, s]) => [q, r + 1, s - 1],
  sw: ([q, r, s]) => [q - 1, r + 1, s],
  w: ([q, r, s]) => [q - 1, r, s + 1],
  nw: ([q, r, s]) => [q, r - 1, s + 1],
};

const walkInstruction = (instruction) => {
  let coords = [...REFERENCE];
  let buffer = '' + instruction;

  while (buffer) {
    DIRECTIONS.some((direction) => {
      if (buffer.startsWith(direction)) {
        buffer = buffer.slice(direction.length);
        coords = navigate[direction](coords);

        return true;
      }
    });
  }

  return coords;
};

const instructions = strToLines(getInput());
const grid = {};

grid[coordsToString(REFERENCE)] = WHITE;

instructions.forEach((instruction) => {
  const coords = coordsToString(walkInstruction(instruction));

  if (coords in grid) {
    grid[coords] = grid[coords] === WHITE ? BLACK : WHITE;
  } else {
    grid[coords] = BLACK;
  }
});

let result = Object.values(grid).filter((color) => color === BLACK).length;

outResult(result);
