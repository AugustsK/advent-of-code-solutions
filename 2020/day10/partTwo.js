const { getInput, strToLines, lineToArr, lineToIntArr, strToEmptyLineGroups } = require('../../utils/input');
const { arrIntersects, arrDiff, countInstances, sort } = require('../../utils/array');
const { outResult, outDebug } = require('../../utils/output');

const adapters = [0, ...sort(strToLines(getInput()).map((x) => parseInt(x, 10)))];
let ranges = [];
let buffer = [];

adapters.push(adapters[adapters.length - 1] + 3);

adapters.reduce((prev, cur) => {
  if (prev + 1 < cur) {
    if (buffer.length > 2) {
      ranges.push([...buffer]);
    }

    buffer = [cur];
  } else {
    buffer.push(cur);
  }

  return cur;
}, 0);

let result = ranges.reduce((total, current) => {
  if (current.length === 3) return (total *= 2);
  if (current.length === 4) return (total *= 4);
  if (current.length === 5) return (total *= 7);
}, 1);

outResult(result);
