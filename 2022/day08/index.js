const Utils = require('../../utils');

const grid = new Map();
const visibleTrees = new Set();
const rawGrid = Utils.Input.strToLines(Utils.Input.getInput());
const Y_SIZE = rawGrid.length;
const X_SIZE = rawGrid[0].split('').length;

const coords = (x, y) => `${x}-${y}`;

const getGridLine = (axis, start, end, opposite) => {
    const result = [];

    for (let i = start; i <= end; i++) {
        const coordStr = axis === 'x' ? coords(i, opposite) : coords(opposite, i);

        result.push(grid.get(coordStr));
    }

    return result;
}

const getLineSight = (line, height) => {
    const indexOfHighest = line.findIndex(item => item >= height);

    return indexOfHighest > -1 ? indexOfHighest + 1 : line.length;
};

const isVisible = (x, y) => {
    const isLeftSide = x === 0;
    const isRightSide = x === X_SIZE - 1;
    const isTopSide = y === 0;
    const isBottomSide = y === Y_SIZE - 1;

    if (isBottomSide || isTopSide || isLeftSide || isRightSide) {
        return true;
    }

    const self = grid.get(coords(x, y));
    const up = Math.max(...getGridLine('y', 0, y - 1, x));
    const down = Math.max(...getGridLine('y', y + 1, Y_SIZE - 1, x));
    const left = Math.max(...getGridLine('x', 0, x - 1, y));
    const right = Math.max(...getGridLine('x', x + 1, X_SIZE - 1, y));

    return self > up || self > down || self > left || self > right;
}

const getScenicScore = (x, y) => {
    const isLeftSide = x === 0;
    const isRightSide = x === X_SIZE - 1;
    const isTopSide = y === 0;
    const isBottomSide = y === Y_SIZE - 1;

    if (isBottomSide || isTopSide || isLeftSide || isRightSide) {
        return 0;
    }

    const self = grid.get(coords(x, y));

    const up = getGridLine('y', 0, y - 1, x).reverse();
    const down = getGridLine('y', y + 1, Y_SIZE - 1, x);
    const left = getGridLine('x', 0, x - 1, y).reverse();
    const right = getGridLine('x', x + 1, X_SIZE - 1, y);

    return getLineSight(up, self) * getLineSight(right, self) * getLineSight(down, self) * getLineSight(left, self);
}

rawGrid.forEach((line, y) => line.split('').forEach((tree, x) => {
    const treeHeight = parseInt(tree, 10);
    grid.set(coords(x, y), treeHeight);
}));

let highestScenicScore = 0;

for (let x = 0; x < X_SIZE; x++) {
    for (let y = 0; y < Y_SIZE; y++) {
        if (isVisible(x, y)) {
            visibleTrees.add(coords(x, y));
        }

        const scenicScore = getScenicScore(x, y);

        if (scenicScore > highestScenicScore) {
            highestScenicScore = scenicScore;
        }
    }
}

let partOne = visibleTrees.size;
let partTwo = highestScenicScore;

Utils.Output.outResult(partOne);
Utils.Output.outResult(partTwo);
