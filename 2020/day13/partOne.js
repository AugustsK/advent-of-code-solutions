const { getInput, strToLines, lineToArr, lineToIntArr, strToEmptyLineGroups } = require('../../utils/input');
const { arrIntersects, arrDiff, countInstances, sort } = require('../../utils/array');
const { outResult, outDebug, outProgress } = require('../../utils/output');

const input = strToLines(getInput());
const earliest = parseInt(input[0]);
const busses = input[1].split(',').filter(x => x !== 'x').map(x => parseInt(x, 10));
let result;
let wait = 0;

while (!result) {
    busses.some(bus => {
        if ((earliest + wait) % bus === 0) {
            result = wait * bus;

            return true;
        }
    });

    wait++;
}

outResult(result);
