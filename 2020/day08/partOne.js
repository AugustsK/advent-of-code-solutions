const { getInput, strToLines, lineToArr, lineToIntArr, strToEmptyLineGroups } = require('../../utils/input');
const { arrDiff, arrIntersects } = require('../../utils/array');
const { outResult, outDebug } = require('../../utils/output');

const instructions = strToLines(getInput()).map((line) => line.split(' '));
const runIndex = new Set();
let curIndex = 0;
let accumulator = 0;

while (curIndex >= 0 && curIndex < instructions.length) {
  let [inst, value] = instructions[curIndex];
  value = parseInt(value, 10);

  switch (inst) {
    case 'nop':
      curIndex++;

      break;
    case 'acc':
      accumulator += value;
      curIndex++;

      break;
    case 'jmp':
      curIndex += value;

      break;
  }

  if (runIndex.has(curIndex)) {
    curIndex = instructions.length + 1;
  } else {
    runIndex.add(curIndex);
  }
}

// solution goes here

outResult(accumulator);
