const { getInput, strToLines, lineToArr, lineToIntArr, strToEmptyLineGroups } = require('../../utils/input');
const { arrIntersects, arrDiff, countInstances, sort } = require('../../utils/array');
const { outResult, outDebug, outProgress } = require('../../utils/output');

/**
 Now, you just need to model the people who will be arriving shortly.
 Fortunately, people are entirely predictable and always follow a simple set of rules.
 All decisions are based on the number of occupied seats adjacent to a given seat
 (one of the eight positions immediately up, down, left, right, or diagonal from the seat).
 The following rules are applied to every seat simultaneously:

 If a seat is empty (L) and there are no occupied seats adjacent to it, the seat becomes occupied.
 If a seat is occupied (#) and four or more seats adjacent to it are also occupied, the seat becomes empty.
 Otherwise, the seat's state does not change.
 */

const EMPTY = 'L';
const OCCUPIED = '#';
const rawGrid = strToLines(getInput()).map((line) => line.split(''));
const xLen = rawGrid[0].length;
const yLen = rawGrid.length;
let grid = {};
let mutate = true;
let iterations = 0;

const coordsToStr = (x, y) => `${x}:${y}`;

const isValidCoords = (x, y) => x >= 0 && x < xLen && y >= 0 && y < yLen;

const isSeat = (spot) => [EMPTY, OCCUPIED].includes(spot);

const getOccupiedNeighbours = (x, y) => {
  let occupied = 0;

  for (let chkX = 0; chkX < 3; chkX++) {
    for (let chkY = 0; chkY < 3; chkY++) {
      const siblingX = x + (chkX - 1);
      const siblingY = y + (chkY - 1);

      if (
        !(siblingX === x && siblingY === y) &&
        isValidCoords(siblingX, siblingY) &&
        grid[coordsToStr(siblingX, siblingY)] === OCCUPIED
      ) {
        occupied++;
      }

      if (occupied >= 4) {
        return occupied;
      }
    }
  }

  return occupied;
};

const drawGrid = () => {
  let out = '\n';

  for (let y = 0; y < yLen; y++) {
    let line = '';
    for (let x = 0; x < xLen; x++) {
      line += grid[coordsToStr(x, y)];
    }
    out += line + '\n';
  }

  out += '\n=================================';

  console.log(out);
};

rawGrid.forEach((line, y) => line.forEach((spot, x) => (grid[coordsToStr(x, y)] = spot)));

//drawGrid();

while (mutate) {
  outProgress(`Iteration ${++iterations}...`);
  let changed = false;
  let toggle = [];

  for (let x = 0; x < xLen; x++) {
    for (let y = 0; y < yLen; y++) {
      const spot = grid[coordsToStr(x, y)];

      if (isSeat(spot)) {
        const occupiedNeighbours = getOccupiedNeighbours(x, y);

        if (spot === EMPTY && occupiedNeighbours === 0) {
          toggle.push(coordsToStr(x, y));
          changed = true;
        } else if (spot === OCCUPIED && occupiedNeighbours >= 4) {
          toggle.push(coordsToStr(x, y));
          changed = true;
        }
      }
    }
  }

  toggle.forEach((coords) => (grid[coords] = grid[coords] === OCCUPIED ? EMPTY : OCCUPIED));

  //drawGrid();
  mutate = !!changed;
}

outResult(Object.values(grid).filter((spot) => spot === OCCUPIED).length);
