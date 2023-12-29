const { getInput, strToLines, lineToArr, lineToIntArr, strToEmptyLineGroups } = require('../../utils/input');
const { arrDiff, arrIntersects } = require('../../utils/array');
const { outResult, outDebug } = require('../../utils/output');

outResult(
  strToEmptyLineGroups(getInput())
    .map((group) => new Set(group.map((str) => str.split('')).flat()).size)
    .reduce((sum, current) => sum + current),
);
