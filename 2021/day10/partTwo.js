const { getInput, strToLines, lineToArr, lineToIntArr, strToEmptyLineGroups } = require('../../utils/input');
const { arrDiff, arrIntersects } = require('../../utils/array');
const { outResult, outDebug } = require('../../utils/output');

const map = str => str
        .replace(/\(/g, 'a')
        .replace(/\)/g, 'b')
        .replace(/\[/g, 'c')
        .replace(/]/g, 'd')
        .replace(/{/g, 'e')
        .replace(/}/g, 'f')
        .replace(/</g, 'g')
        .replace(/>/g, 'h');

const pairs = { a: 'b', c: 'd', e: 'f', g: 'h' };
const points = { b: 1, d: 2, f: 3, h: 4 }
const lines = strToLines(getInput()).map(line => map(line));
const calculate = buffer => buffer.reverse().reduce((sum, char) => sum * 5 + points[pairs[char]], 0);

const validate = (str, bufferArg = []) => {
    const char = str.slice(0, 1);
    const remainder = str.slice(1);
    const buffer = [...bufferArg];

    if (['a', 'c', 'e', 'g'].includes(char)) {
        buffer.push(char);

        if (remainder.length) return validate(remainder, buffer);
        else return calculate(buffer);
    } else {
        const toCheck = buffer.pop();

        if (pairs[toCheck] === char) {
            if (remainder.length) return validate(remainder, buffer);
            else if (buffer.length) return calculate(buffer);
        }
    }

    return false
}

let scores = [];

lines.forEach(line => {
    const score = validate(line);

    if (score) scores.push(score);
});

outResult(scores.sort((a, b) => a < b ? -1 : b > a ? 1 : 0)[Math.floor(scores.length / 2)]);
