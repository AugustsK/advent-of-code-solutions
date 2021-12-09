const { getInput, strToLines, lineToArr, lineToIntArr, strToEmptyLineGroups } = require('../../utils/input');
const { arrDiff, arrIntersects } = require('../../utils/array');
const { outResult, outDebug } = require('../../utils/output');

outResult(
    strToEmptyLineGroups(getInput())
        .map(group => group.length > 1 ? arrIntersects(...group.map(str => str.split(''))).length : group[0].length)
        .reduce((sum, current) => sum + current)
);