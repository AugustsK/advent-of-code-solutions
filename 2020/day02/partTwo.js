const { getInput, strToLines, lineToArr, lineToIntArr } = require('../../utils/input');
const { arrDiff, arrIntersects } = require('../../utils/array');
const { outResult, outDebug } = require('../../utils/output');

const lines = strToLines(getInput());
let result = 0;

lines.forEach(passEntry => {
    const [ policy, passw ] = passEntry.split(': ');
    const [ times, char ] = policy.split(' ');
    const [ first, last ] = times.split('-').map(x => parseInt(x, 10));

    if (passw[first - 1] === char ^ passw[last - 1] === char) {
        result += 1;
    }
});

outResult(result);
