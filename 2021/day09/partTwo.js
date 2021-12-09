const { getInput, strToLines, lineToArr, lineToIntArr } = require('../../utils/input');
const { arrDiff, arrIntersects } = require('../../utils/array');
const { outResult, outDebug } = require('../../utils/output');

const lines = strToLines(getInput()).map(line => line.split('').map(x => parseInt(x, 10)));
let lowPoints = [];
let traversed = new Set();

for (let y = 0; y < lines.length; y++) {
    const line = lines[y];

    for (let x = 0; x < line.length; x++) {
        const point = line[x];
        const upPoint = y > 0 ? lines[y - 1][x] : Infinity;
        const rightPoint = x + 1 < line.length ? line[x + 1] : Infinity;
        const downPoint = y + 1 < lines.length ? lines[y + 1][x] : Infinity;
        const leftPoint = x > 0 ? line[x - 1] : Infinity;

        if (
            point < upPoint
            && point < rightPoint
            && point < downPoint
            && point < leftPoint
        ) {
            lowPoints.push({ x, y });
        }
    }
}

const explore = (x, y) => {
    const coordStr = `${x}:${y}`;
    let result = new Set();

    if (traversed.has(coordStr)) return [];

    traversed.add(coordStr);
    const upPoint = y > 0 ? lines[y - 1][x] : 9;
    const rightPoint = x + 1 < lines[y].length ? lines[y][x + 1] : 9;
    const downPoint = y + 1 < lines.length ? lines[y + 1][x] : 9;
    const leftPoint = x > 0 ? lines[y][x - 1] : 9;

    if (upPoint < 9) {
        result = new Set([...result, `${x}:${y - 1}`, ...explore(x, y - 1)]);
    }

    if (rightPoint < 9) {
        result = new Set([...result, `${x + 1}:${y}`, ...explore(x + 1, y)]);
    }

    if (downPoint < 9) {
        result = new Set([...result, `${x}:${y + 1}`, ...explore(x, y + 1)]);
    }

    if (leftPoint < 9) {
        result = new Set([...result, `${x - 1}:${y}`, ...explore(x - 1, y)]);
    }

    return result;
}

lowPoints = lowPoints
    .map(({ x, y }) => { traversed = new Set(); return explore(x, y).size; })
    .sort((a, b) => a < b ? -1 : b > a ? 1 : 0);

outResult(lowPoints.slice(-3).reduce((sum, x) => sum * x));
