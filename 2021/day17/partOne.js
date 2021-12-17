const { getInput, strToLines, lineToArr, lineToIntArr, strToEmptyLineGroups } = require('../../utils/input');
const { arrIntersects, arrDiff, countInstances, sort } = require('../../utils/array');
const { lcm, gcd, gauss } = require('../../utils/math');
const { outResult, outDebug, outProgress } = require('../../utils/output');

const [ xInput, yInput ] = getInput().split(', ');
const [ , xRange ] = xInput.split('=');
const [ xMin, xMax ] = xRange.split('..').map(x => parseInt(x, 10));
const [ , yRange ] = yInput.split('=');
const [ yMin, yMax ] = yRange.split('..').map(y => parseInt(y, 10));

const findFactorial = (target, overshoot = true) => {
    let result = 2;
    let factorial = gauss(2);

    while (factorial < target) {
        factorial = gauss(++result);
    }

    return overshoot ? result : result - 1;
}

// Trajectories that stop on X axis within bounds
const minXTrajectory = findFactorial(xMin, true);
const maxXTrajectory = findFactorial(xMax, false);

let result = gauss(Math.abs(yMin) - 1);

outResult(result);
