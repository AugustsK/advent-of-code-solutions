const { getInput, strToLines, lineToArr, lineToIntArr, strToEmptyLineGroups } = require('../../utils/input');
const { arrDiff, arrIntersects } = require('../../utils/array');
const { outResult, outDebug } = require('../../utils/output');

const initialInstructions = strToLines(getInput()).map((line) => line.split(' '));
let result = 0;

const run = (instructions) => {
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
      accumulator = false;
      curIndex = instructions.length + 1;
    } else {
      runIndex.add(curIndex);
    }
  }

  return accumulator;
};

initialInstructions.some(([inst, val], i) => {
  if (['nop', 'jmp'].includes(inst)) {
    let modified = [...initialInstructions];

    modified.splice(i, 1, [inst === 'nop' ? 'jmp' : 'nop', val]);
    result = run(modified);

    return !!result;
  }

  return false;
});

outResult(result);
