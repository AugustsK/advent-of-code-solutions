const { getInput, strToLines, lineToArr, lineToIntArr } = require('../../utils/input');
const { outResult, outDebug } = require('../../utils/output');

const list = strToLines(getInput());
let result = 0;
let m1 = 0;
let m2 = 0;
let m3 = 0;
let prev = 0;
let increase = 0;

list.map(item => parseInt(item, 10)).forEach((item, i, arr) => {
    if (i === 0) m1 = item;
    if (i === 1) m2 = item;
    if (i === 2) m3 = item;

    if (m1 && m2 && m3) {
        if (prev && m1 + m2 + m3 > prev) {
            increase++;
        }

        prev = m1 + m2 + m3;
        m1 = m2;
        m2 = m3;
        m3 = item;
    }
});

result = increase;

outResult(result);
