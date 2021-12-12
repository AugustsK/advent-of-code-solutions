const { getInput, strToLines, lineToArr, lineToIntArr, strToEmptyLineGroups } = require('../../utils/input');
const { arrIntersects, arrDiff, countInstances, sort } = require('../../utils/array');
const { outResult, outDebug } = require('../../utils/output');

const adapters = sort(strToLines(getInput()).map(x => parseInt(x, 10)));
let ranges = [];
let buffer = [];

adapters.reduce((prev, cur) => {
    if (prev + 1 < cur) {
        if (buffer.length > 2) {
            ranges.push([...buffer]);
        }

        buffer = [cur];
    } else {
        buffer.push(cur);
    }

    return cur;
}, 0)

outDebug(ranges);

let result = ranges.reduce((total, current) => {
    if (current.length === 3) return total *= 2;
    if (current.length === 4) return total *= 4;
    if (current.length === 5) return total *= 10;
}, 1);

outResult(result);

/**
 * 1-2             = 1
 * 1-2-3           = 2
 * 1-2-3-4         = 4
 * 1-2-3-4-5       = 7
 */
