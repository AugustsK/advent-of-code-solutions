const { getInput, strToLines, lineToArr, lineToIntArr } = require('../../utils/input');
const { outResult, outDebug } = require('../../utils/output');

const lines = strToLines(getInput()).map((line) => line.split(' | '));
let result = 0;

lines.forEach(([uid, digitBuffer]) => {
  const digits = digitBuffer.split(' ');

  digits.forEach((digitStr) => {
    if ([2, 3, 4, 7].includes(digitStr.length)) result++;
  });
});

outResult(result);
