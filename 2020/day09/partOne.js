const { getInput, strToLines, lineToArr, lineToIntArr, strToEmptyLineGroups } = require('../../utils/input');
const { arrDiff, arrIntersects } = require('../../utils/array');
const { outResult, outDebug } = require('../../utils/output');

const numbers = strToLines(getInput()).map(num => parseInt(num, 10));
const preambleSize = 25;
let preamble = [];
let result = false;

const isPreambleSum = num => {
    return preamble.some(x => {
        return preamble.some(y => {
            return x + y === num;
        });
    });
};

numbers.some(num => {
    if (preamble.length < preambleSize) preamble.push(num);
    else {
        if (isPreambleSum(num)) {
            preamble.shift();
            preamble.push(num);
        } else {
            result = num;
        }
    }

    return result;
});

outResult(result);
