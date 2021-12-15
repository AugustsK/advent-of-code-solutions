const { getInput, strToLines, lineToArr, lineToIntArr, strToEmptyLineGroups } = require('../../utils/input');
const { arrIntersects, arrDiff, countInstances, sort } = require('../../utils/array');
const { outResult, outDebug } = require('../../utils/output');

const coordsToStr = (x, y) => `${x}:${y}`;

const coordsToArr = str => str.split(':').map(x => parseInt(x));

const isValid = ([ x, y ]) => x >= 0 && x <= endX && y >= 0 && y <= endY;

const grid = strToLines(getInput()).map(line => line.split('').map(x => parseInt(x, 10)));
const MAX = grid.reduce((total, line) => total + line.reduce((acc, cur) => acc + cur, 0), 0)
const endX = grid[0].length - 1;
const endY = grid.length - 1;
const nodes = {};
const visited = new Set();
const queue = new Set();
let currentNode = [0, 0];

grid.forEach((line, y) => {
    line.forEach((cost, x) => {
        nodes[coordsToStr(x, y)] = {
            cost,
            distance: MAX
        };
        queue.add(coordsToStr(x, y))
    });
});

nodes[coordsToStr(0, 0)].distance = 0;

const updateDistance = ([x, y], curDistance) => {
    if (isValid([x, y])) {
        const coordStr = coordsToStr(x, y);

        if (coordStr in nodes && !visited.has(coordStr)) {
            nodes[coordStr].distance = Math.min(nodes[coordStr].distance, curDistance + nodes[coordStr].cost);
        }
    }
}

const getShortest  = () => {
    const shortest = {
        coords: [0, 0],
        distance: Infinity
    };

    Array.from(queue).forEach(coords => {
        if (nodes[coords].distance < shortest.distance) {
            shortest.distance = nodes[coords].distance;
            shortest.coords = coordsToArr(coords);
        }
    });

    return shortest.coords;
}

while (queue.size > 0 && queue.has(coordsToStr(endX, endY))) {
    const coordStr = coordsToStr(currentNode[0], currentNode[1]);
    const curDistance = nodes[coordStr].distance;
    visited.add(coordStr);
    queue.delete(coordStr);
    updateDistance([currentNode[0], currentNode[1] - 1], curDistance); // up
    updateDistance([currentNode[0] + 1, currentNode[1]], curDistance); // right
    updateDistance([currentNode[0], currentNode[1] + 1], curDistance); // down
    updateDistance([currentNode[0] - 1, currentNode[1]], curDistance); // left

    currentNode = getShortest();
}

outResult(nodes[coordsToStr(endX, endY)].distance);
