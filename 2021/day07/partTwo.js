const { getInput, strToLines, lineToArr, lineToIntArr } = require('../../utils/input');
const { outResult, outDebug } = require('../../utils/output');

const factorial = num => {
    let result = 0;
    for (let i = 1; i <= num; i++) result += i;

    return result;
}

const positions = lineToIntArr(getInput());
let lowestSum = Infinity;
let min = Math.min(...positions);
let max = Math.max(...positions);

for (let i = min; i <= max; i++) {
    let total = 0;

    positions.forEach(subject => {
        total += factorial(Math.abs(subject - i));
    });

    if (total < lowestSum) {
        lowestSum = total;
    }
}

outResult(lowestSum);
