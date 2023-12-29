const { workerData, parentPort } = require('worker_threads');

const coords = (x, y) => `${x}-${y}`;

const { grid, queue, start, end, min, max } = workerData;
const visited = new Set();
let currentNode = [...start];
let shortestPath = Infinity;

const getShortest = () => {
  const shortest = {
    coords: [0, 0],
    path: Infinity,
  };

  [...queue.values()].forEach((coordStr) => {
    const node = grid.get(coordStr);
    if (node.path < shortest.path) {
      shortest.path = node.path;
      shortest.coords = node.coords;
    }
  });

  shortestPath = shortest.path;

  if (shortestPath === Infinity) {
    throw 'not right';
  }

  return shortest.coords;
};

const isValid = (x, y) => x >= min[0] && x <= max[0] && y >= min[1] && y <= max[1];

const updateDistance = ([x, y], curDistance, height) => {
  if (isValid(x, y)) {
    const coordStr = coords(x, y);

    if (grid.has(coordStr) && !visited.has(coordStr)) {
      const node = grid.get(coordStr);

      if (height + 1 >= node.height) {
        node.path = Math.min(node.path, curDistance + 1);
        grid.set(coordStr, node);
      }
    }
  }
};

while (queue.size > 0 && queue.has(coords(...end))) {
  const coordStr = coords(...currentNode);
  const node = grid.get(coordStr);
  const curDistance = node.path;
  visited.add(coordStr);
  queue.delete(coordStr);

  updateDistance([currentNode[0], currentNode[1] - 1], curDistance, node.height); // up
  updateDistance([currentNode[0] + 1, currentNode[1]], curDistance, node.height); // right
  updateDistance([currentNode[0], currentNode[1] + 1], curDistance, node.height); // down
  updateDistance([currentNode[0] - 1, currentNode[1]], curDistance, node.height); // left

  currentNode = getShortest();
}

parentPort.postMessage(grid.get(coords(...end)).path);
