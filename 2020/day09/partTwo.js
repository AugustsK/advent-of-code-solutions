const { getInput, strToLines, lineToArr, lineToIntArr, strToEmptyLineGroups } = require('../../utils/input');
const { arrDiff, arrIntersects, sort } = require('../../utils/array');
const { outResult, outDebug } = require('../../utils/output');

const numbers = strToLines(getInput()).map((num) => parseInt(num, 10));
const preambleSize = 25;
let preamble = [];
let weakness = false;
let result = false;

const isPreambleSum = (num) => {
  return preamble.some((x) => {
    return preamble.some((y) => {
      return x + y === num;
    });
  });
};

numbers.some((num) => {
  if (preamble.length < preambleSize) preamble.push(num);
  else {
    if (isPreambleSum(num)) {
      preamble.shift();
      preamble.push(num);
    } else {
      weakness = num;
    }
  }

  return weakness;
});

numbers.some((start, i) => {
  let all = [start];
  let sum = start;

  numbers.slice(i + 1).some((num) => {
    sum += num;

    if (sum <= weakness) all.push(num);
    if (sum === weakness) return true;
    if (sum > weakness) {
      all = [];

      return true;
    }
  });

  if (all.length) {
    const sorted = sort(all);
    const lowest = sorted.shift();
    const highest = sorted.pop();

    result = lowest + highest;
  }

  return result;
});

outResult(result);
