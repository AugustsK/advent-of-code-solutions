const { getInput, strToLines, lineToArr, lineToIntArr, strToEmptyLineGroups } = require('../../utils/input');
const { arrDiff, arrIntersects } = require('../../utils/array');
const { outResult, outDebug } = require('../../utils/output');

const map = (str) =>
  str
    .replace(/\(/g, 'a')
    .replace(/\)/g, 'b')
    .replace(/\[/g, 'c')
    .replace(/]/g, 'd')
    .replace(/{/g, 'e')
    .replace(/}/g, 'f')
    .replace(/</g, 'g')
    .replace(/>/g, 'h');

const pairs = { a: 'b', c: 'd', e: 'f', g: 'h' };
const points = { b: 3, d: 57, f: 1197, h: 25137 };
const lines = strToLines(getInput()).map((line) => map(line));
let result = 0;

const validate = (str, bufferArg = []) => {
  const char = str.slice(0, 1);
  const remainder = str.slice(1);
  const buffer = [...bufferArg];

  if (['a', 'c', 'e', 'g'].includes(char)) {
    buffer.push(char);

    if (remainder.length) return validate(remainder, buffer);
    else return 0;
  } else {
    const toCheck = buffer.pop();

    if (pairs[toCheck] === char) {
      if (remainder.length) return validate(remainder, buffer);
      else return 0;
    } else {
      return points[char];
    }
  }
};

lines.forEach((line) => (result += validate(line)));

outResult(result);
