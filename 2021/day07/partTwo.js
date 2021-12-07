const { getInput, strToLines, lineToArr, lineToIntArr } = require('../../utils/input');
const { outResult, outDebug } = require('../../utils/output');

const gauss = num => {
    return (num + 1) * num / 2;
}

const positions = lineToIntArr(getInput());
let lowestSum = Infinity;
let min = Math.min(...positions);
let max = Math.max(...positions);

for (let i = min; i <= max; i++) {
    let total = 0;

    positions.forEach(subject => {
        total += gauss(Math.abs(subject - i));
    });

    if (total < lowestSum) {
        lowestSum = total;
    }
}

outResult(lowestSum);
