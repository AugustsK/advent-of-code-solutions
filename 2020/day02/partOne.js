const { getInput, strToLines, lineToArr, lineToIntArr } = require('../../utils/input');
const { arrDiff, arrIntersects } = require('../../utils/array');
const { outResult, outDebug } = require('../../utils/output');

const lines = strToLines(getInput());
let result = 0;

lines.forEach(passEntry => {
    const [ policy, passw ] = passEntry.split(': ');
    const [ times, char ] = policy.split(' ');
    const [ min, max ] = times.split('-').map(x => parseInt(x, 10));
    const occurrences = passw.split('').filter(x => x === char).length;

    if (occurrences >= min && occurrences <= max) {
        result += 1;
    }
});

outResult(result);
