const { getInput, strToLines, lineToArr, lineToIntArr, strToEmptyLineGroups } = require('../../utils/input');
const { arrIntersects, arrDiff, countInstances, sort } = require('../../utils/array');
const { outResult, outDebug } = require('../../utils/output');

const adapters = sort(strToLines(getInput()).map(x => parseInt(x, 10)));
let diff1 = 0;
let diff3 = 1;

adapters.reduce((prev, current) => {
    if (prev + 1 === current) diff1++;
    if (prev + 3 === current) diff3++;

    return current;
}, 0);

outResult(diff1 * diff3);
