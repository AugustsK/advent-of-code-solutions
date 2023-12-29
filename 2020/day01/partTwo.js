const { getInput, strToLines, lineToArr, lineToIntArr } = require('../../utils/input');
const { arrDiff, arrIntersects } = require('../../utils/array');
const { outResult, outDebug } = require('../../utils/output');

const nums = strToLines(getInput()).map((x) => parseInt(x, 10));
const MAGIC = 2020;
let result = 0;

nums.forEach((x) => {
  nums.forEach((y) => {
    nums.forEach((z) => {
      if (x + y + z === MAGIC) {
        result = x * y * z;
      }
    });
  });
});

outResult(result);
