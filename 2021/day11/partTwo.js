const { getInput, strToLines, lineToArr, lineToIntArr, strToEmptyLineGroups } = require('../../utils/input');
const { arrDiff, arrIntersects } = require('../../utils/array');
const { outResult, outDebug } = require('../../utils/output');

const grid = strToLines(getInput()).map(line => line.split('').map(num => parseInt(num, 10)));
const total = grid.length * grid[0].length;
let step = 0;
let flashed = new Set();

const validateCoords = (y, x) => {
    return y >= 0 && x >= 0 && y < grid.length && x < grid[y].length;
}

const energyIncrease = (y, x) => {
    if (!validateCoords(y, x)) return null;

    if (grid[y][x] === 9) {
        flashed.add(`${x}:${y}`);
        grid[y][x] = 0;
        flashAround(y, x);
    } else {
        if (!flashed.has(`${x}:${y}`)) {
            grid[y][x] += 1;
        }
    }
}

const flashAround = (y, x) => {
    energyIncrease(y, x + 1); // right
    energyIncrease(y, x - 1); // left
    energyIncrease(y + 1, x); // down
    energyIncrease(y - 1, x); // up
    energyIncrease(y + 1, x + 1); // down-right
    energyIncrease(y - 1, x - 1); // up-left
    energyIncrease(y + 1, x - 1); // down-left
    energyIncrease(y - 1, x + 1); // up-right
}

while (flashed.size < total) {
    flashed = new Set();

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            energyIncrease(y, x);
        }
    }

    step++;
}

outResult(step);
