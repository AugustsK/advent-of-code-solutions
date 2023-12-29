const { getInput, strToLines, lineToArr, lineToIntArr } = require('../../utils/input');
const { outResult, outDebug } = require('../../utils/output');

const list = strToLines(getInput());
let result = 0;
let gamma = '';
let epsilon = '';
let pos = 0;

while (list[0][pos]) {
  const firstBits = list.map((bits) => bits[pos]);
  const ones = firstBits.filter((bit) => bit === '1').length;
  const zeroes = firstBits.filter((bit) => bit === '0').length;

  gamma += ones > zeroes ? '1' : '0';
  epsilon += ones < zeroes ? '1' : '0';
  pos++;
}

result = parseInt(gamma, 2) * parseInt(epsilon, 2);

outResult(result);
