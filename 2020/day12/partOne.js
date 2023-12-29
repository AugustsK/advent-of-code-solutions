const { getInput, strToLines, lineToArr, lineToIntArr, strToEmptyLineGroups } = require('../../utils/input');
const { arrIntersects, arrDiff, countInstances, sort } = require('../../utils/array');
const { outResult, outDebug, outProgress } = require('../../utils/output');

const DIRECTIONS = ['E', 'S', 'W', 'N'];
const instructions = strToLines(getInput());
const manhattan = {
  x: 0,
  y: 0,
};
let direction = 'E';

const rotate = (deg, right = true) => {
  const curIndex = DIRECTIONS.indexOf(direction);
  const split = deg / 90;
  let newIndex = (curIndex + (right ? split : 4 - split)) % 4;

  direction = DIRECTIONS[newIndex];
};

const move = (dir, amount) => {
  switch (dir) {
    case 'E':
      manhattan.x += amount;

      break;
    case 'S':
      manhattan.y += amount;

      break;
    case 'W':
      manhattan.x -= amount;

      break;
    case 'N':
      manhattan.y -= amount;

      break;
  }
};

instructions.forEach((instruction) => {
  const action = instruction.slice(0, 1);
  const amount = parseInt(instruction.slice(1), 10);

  switch (action) {
    case 'F':
      move(direction, amount);

      break;
    case 'R':
      rotate(amount, true);

      break;
    case 'L':
      rotate(amount, false);

      break;
    default:
      move(action, amount);
  }
});

outResult(Math.abs(manhattan.x) + Math.abs(manhattan.y));
