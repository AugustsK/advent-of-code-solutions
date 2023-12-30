import type { Coords } from '../../types';

import { InputUtil, OutputUtil, MathUtil, ArrayUtil } from '../../utils';

const histories = InputUtil.strToLines(InputUtil.getInput()).map((line) =>
  line.split(' ').map((num) => parseInt(num, 10)),
);

const extrapolated = histories.map((history) => {
  let result = ArrayUtil.last(history);
  let modified = [...history];

  while (!modified.every((val) => val === 0)) {
    const temp = [];

    for (let i = 1; i < modified.length; i++) {
      temp.push(modified[i] - modified[i - 1]);
    }

    modified = temp;
    result += ArrayUtil.last(modified);
  }

  return result;
});

let partOne = extrapolated.reduce((sum, cur) => sum + cur, 0);

const extrapolatedBackwards = histories.map((history) => {
  let result = [ArrayUtil.first(history)];
  let modified = [...history];

  while (!modified.every((val) => val === 0)) {
    const temp = [];

    for (let i = 1; i < modified.length; i++) {
      temp.push(modified[i] - modified[i - 1]);
    }

    modified = temp;
    result.push(ArrayUtil.first(modified));
  }

  return result.reverse().reduce((res, cur) => {
    return cur - res;
  }, 0);
});

let partTwo = extrapolatedBackwards.reduce((sum, cur) => sum + cur, 0);

OutputUtil.outResult(partOne);
OutputUtil.outResult(partTwo);
