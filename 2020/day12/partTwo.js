const { getInput, strToLines, lineToArr, lineToIntArr, strToEmptyLineGroups } = require('../../utils/input');
const { arrIntersects, arrDiff, countInstances, sort } = require('../../utils/array');
const { outResult, outDebug, outProgress } = require('../../utils/output');

const DIRECTIONS = ['E', 'S', 'W', 'N'];
const instructions = strToLines(getInput());
const manhattan = {
  x: 0,
  y: 0,
};
const waypoint = {
  x: 10,
  y: -1,
};

const rotate = (deg, right = true) => {
  let rotations = deg / 90;
  let directions = [
    Math.max(waypoint.x, 0),
    Math.max(waypoint.y, 0),
    Math.abs(Math.min(waypoint.x, 0)),
    Math.abs(Math.min(waypoint.y, 0)),
  ];

  while (rotations-- > 0) {
    if (right) {
      let x = directions.pop();
      directions.unshift(x);
    } else {
      let x = directions.shift();
      directions.push(x);
    }
  }

  const [east, south, west, north] = directions;

  waypoint.x = east === 0 ? 0 - west : east;
  waypoint.y = south === 0 ? 0 - north : south;
};

const moveWayPoint = (dir, amount) => {
  switch (dir) {
    case 'E':
      waypoint.x += amount;

      break;
    case 'S':
      waypoint.y += amount;

      break;
    case 'W':
      waypoint.x -= amount;

      break;
    case 'N':
      waypoint.y -= amount;

      break;
  }
};

const moveShip = (amount) => {
  manhattan.x += amount * waypoint.x;
  manhattan.y += amount * waypoint.y;
};

instructions.forEach((instruction) => {
  const action = instruction.slice(0, 1);
  const amount = parseInt(instruction.slice(1), 10);

  switch (action) {
    case 'F':
      moveShip(amount);

      break;
    case 'R':
      rotate(amount, true);

      break;
    case 'L':
      rotate(amount, false);

      break;
    default:
      moveWayPoint(action, amount);
  }
});

outResult(Math.abs(manhattan.x) + Math.abs(manhattan.y));
