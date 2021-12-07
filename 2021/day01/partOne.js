const { getInput, strToLines, lineToArr, lineToIntArr } = require('../../utils/input');
const { outResult, outDebug } = require('../../utils/output');

const list = strToLines(getInput());
let result = 0;
let prev = null;
let increase = 0;

list.map(item => parseInt(item, 10)).forEach(item => {
    if (prev && item > prev) {
        increase++;
    }

    prev = item;
});

result = increase;

outResult(result);
