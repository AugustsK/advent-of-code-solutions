const { getInput, strToLines, lineToArr, lineToIntArr, strToEmptyLineGroups } = require('../../utils/input');
const { arrIntersects, arrDiff, countInstances, sort } = require('../../utils/array');
const { lcm, gcd, gauss } = require('../../utils/math');
const { outResult, outDebug, outProgress } = require('../../utils/output');

const [, yInput] = getInput().split(', ');
const [, yRange] = yInput.split('=');
const [yMin] = yRange.split('..').map((y) => parseInt(y, 10));

let result = gauss(Math.abs(yMin) - 1);

outResult(result);
