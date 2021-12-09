const { getInput, strToLines, lineToArr, lineToIntArr } = require('../../utils/input');
const { arrDiff, arrIntersects } = require('../../utils/array');
const { outResult, outDebug } = require('../../utils/output');

const lines = strToLines(getInput());
let result = 0;

for (let y = 0; y < lines.length; y++) {
    const line = lines[y];

    for (let x = 0; x < line.length; x++) {
        const point = parseInt(line[x], 10);
        const topPoint = y > 0 ? parseInt(lines[y-1][x], 10) : Infinity;
        const rightPoint = x + 1 < line.length ? parseInt(line[x+1], 10) : Infinity;
        const bottomPoint = y + 1 < lines.length ? parseInt(lines[y+1][x], 10) : Infinity;
        const leftPoint = x > 0 ? parseInt(line[x-1], 10) : Infinity;

        if (point < topPoint && point < rightPoint && point < bottomPoint && point < leftPoint) result += 1 + point;
    }
}

outResult(result);
