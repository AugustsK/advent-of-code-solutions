const { getInput, strToLines, lineToArr, lineToIntArr, strToEmptyLineGroups } = require('../../utils/input');
const { arrIntersects, arrDiff, countInstances, sort } = require('../../utils/array');
const { outResult, outDebug } = require('../../utils/output');

let dots = strToLines(getInput()).filter(line => /^[0-9]/.test(line)).map(line => {
    const [ x, y ] = line.split(',').map(x => parseInt(x, 10));

    return { x, y };
});
const instructions = strToLines(getInput()).filter(line => /^fold/.test(line)).map(line => {
    const [ axis, amount ] = line.replace('fold along ', '').split('=');

    return { axis, amount: parseInt(amount, 10) };
});

const filterDots = () => {
    const unique = new Set();

    dots = dots.filter(dot => {
        const dotStr = `${dot.x}:${dot.y}`;

        if (unique.has(dotStr)) return false;
        else return unique.add(dotStr);
    });
}

const fold = (axis, amount) => {
    dots = dots.map(dot => {
        return {
            x: axis === 'x' ? (dot.x > amount ? dot.x - (dot.x - amount) * 2 : dot.x) : dot.x,
            y: axis === 'y' ? (dot.y > amount ? dot.y - (dot.y - amount) * 2 : dot.y) : dot.y
        }
    });

    filterDots();
}

instructions.forEach(({ axis, amount }) => fold(axis, amount));

let grid = [];
let highestY = 0;
let highestX = 0;

dots.forEach(({ x, y }) => {
    highestX = x > highestX ? x : highestX;
    highestY = y > highestY ? y : highestY;
});

for (let y = 0; y <= highestY; y++) {
    grid.push([]);
    for (let x = 0; x <= highestX; x++) grid[y].push('.');
}

dots.forEach(({ x, y }) => grid[y][x] = '#');
console.log(grid.map(line => line.join('')).join('\n'));
