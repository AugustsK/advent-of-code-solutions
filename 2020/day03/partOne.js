const { getInput, strToLines, lineToArr, lineToIntArr } = require('../../utils/input');
const { arrDiff, arrIntersects } = require('../../utils/array');
const { outResult, outDebug } = require('../../utils/output');

const lines = strToLines(getInput());
const length = lines[0].length;
let result = 0;
let j = 0;

for (let y = 0; y < lines.length; y++) {
    const x = j % length;

    if (lines[y][x] === '#') result += 1;

    j += 3;
}

outResult(result);
