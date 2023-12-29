const { getInput, strToLines, lineToArr, lineToIntArr } = require('../../utils/input');
const { arrDiff, arrIntersects } = require('../../utils/array');
const { outResult, outDebug } = require('../../utils/output');

const lines = strToLines(getInput());
const length = lines[0].length;
const traversals = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
];

const traverse = (right, down) => {
  let trees = 0;
  let j = 0;

  for (let y = 0; y < lines.length; y += down) {
    const x = j % length;

    if (lines[y][x] === '#') trees += 1;

    j += right;
  }

  return trees;
};

let result = 1;

traversals.forEach((traversal) => (result *= traverse.apply(null, traversal)));

outResult(result);
