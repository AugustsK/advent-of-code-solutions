const { getInput, strToLines, lineToArr, lineToIntArr, strToEmptyLineGroups } = require('../../utils/input');
const { arrIntersects, arrDiff, countInstances, sort } = require('../../utils/array');
const { lcm, gcd } = require('../../utils/math');
const { outResult, outDebug, outProgress } = require('../../utils/output');

const input = strToLines(getInput());
const listOfBusses = input[1]
    .split(',')
    .map((x, i) => ({ id: x !== 'x' ? parseInt(x, 10) : x, offset: i }))
    .filter(x => x.id !== 'x');
let first = listOfBusses.shift();
let timestamp = first.id;
let inc = first.id; // first bus timestamp will be multiple of ID

for (const { id, offset } of listOfBusses) {
    // check next bus timestamp if it matches criteria
    while ((timestamp + offset) % id !== 0) {
        timestamp += inc;
    }

    inc = lcm(inc, id);
}

outResult(timestamp);
