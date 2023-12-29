const { getInput, strToLines, lineToArr, lineToIntArr, strToEmptyLineGroups } = require('../../utils/input');
const { arrIntersects, arrDiff, countInstances, sort } = require('../../utils/array');
const { outResult, outDebug } = require('../../utils/output');

const coordsToStr = (x, y) => `${x}:${y}`;

const coordsToArr = (str) => str.split(':').map((x) => parseInt(x));

const isValid = ([x, y]) => x >= 0 && x <= endX && y >= 0 && y <= endY;

const grid = strToLines(getInput()).map((line) => line.split('').map((x) => parseInt(x, 10)));
const MAX = grid.reduce((total, line) => total + line.reduce((acc, cur) => acc + cur, 0), 0);
const endX = grid[0].length * 5 - 1;
const endY = grid.length * 5 - 1;
const nodes = {};
const visited = new Set();
const queue = new Set();
const notInfinite = new Set();
let currentNode = [0, 0];

for (let i = 0; i < 5; i++) {
  grid.forEach((line, y) => {
    const realY = i * grid.length + y;

    for (let j = 0; j < 5; j++) {
      line.forEach((cost, x) => {
        const realX = j * grid[y].length + x;
        let realCost = cost + i + j;

        if (realCost > 9) {
          realCost = realCost % 9;
        }

        nodes[coordsToStr(realX, realY)] = {
          cost: realCost,
          distance: MAX,
        };
        queue.add(coordsToStr(realX, realY));
      });
    }
  });
}

nodes[coordsToStr(0, 0)].distance = 0;
notInfinite.add(coordsToStr(0, 0));

const updateDistance = ([x, y], curDistance) => {
  if (isValid([x, y])) {
    const coordStr = coordsToStr(x, y);

    if (coordStr in nodes && !visited.has(coordStr)) {
      nodes[coordStr].distance = Math.min(nodes[coordStr].distance, curDistance + nodes[coordStr].cost);

      if (nodes[coordStr].distance < MAX) {
        notInfinite.add(coordStr);
      }
    }
  }
};

let shortestPath = Infinity;

const getShortest = () => {
  const shortest = {
    coords: [0, 0],
    distance: Infinity,
  };

  Array.from(notInfinite).forEach((coords) => {
    if (nodes[coords].distance < shortest.distance) {
      shortest.distance = nodes[coords].distance;
      shortest.coords = coordsToArr(coords);
    }
  });

  shortestPath = shortest.distance;

  return shortest.coords;
};

while (queue.size > 0 && queue.has(coordsToStr(endX, endY))) {
  const coordStr = coordsToStr(currentNode[0], currentNode[1]);
  const curDistance = nodes[coordStr].distance;
  visited.add(coordStr);
  queue.delete(coordStr);
  notInfinite.delete(coordStr);
  updateDistance([currentNode[0], currentNode[1] - 1], curDistance); // up
  updateDistance([currentNode[0] + 1, currentNode[1]], curDistance); // right
  updateDistance([currentNode[0], currentNode[1] + 1], curDistance); // down
  updateDistance([currentNode[0] - 1, currentNode[1]], curDistance); // left

  currentNode = getShortest();

  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.stdout.write(`Remaining nodes: ${queue.size}. Currently shortest path: ${shortestPath}`);
}

outResult(nodes[coordsToStr(endX, endY)].distance);
