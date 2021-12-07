const { getInput, strToLines, lineToArr, lineToIntArr } = require('../../utils/input');
const { outResult, outDebug } = require('../../utils/output');

const positions = lineToIntArr(getInput());
let lowestSum = Infinity;

positions.forEach((target, i) => {
    let total = 0;

    positions.forEach((subject, j) => {
        if (i !== j) total += Math.abs(subject - target);
    });

    if (total < lowestSum) {
        lowestSum = total;
    }
});

outResult(lowestSum);
