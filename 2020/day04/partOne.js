const { getInput, strToLines, lineToArr, lineToIntArr } = require('../../utils/input');
const { arrDiff, arrIntersects } = require('../../utils/array');
const { outResult, outDebug } = require('../../utils/output');

const required = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
const passports = getInput()
  .split(/\r?\n\r?\n/)
  .map((line) => line.split(/\n|\s/));
let result = 0;

passports.forEach((pw) => {
  const fields = pw.map((x) => x.split(':')[0]);

  if (!arrDiff(required, fields).length) {
    result++;
  }
});

outResult(result);
