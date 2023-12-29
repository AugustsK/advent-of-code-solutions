const { getInput, strToLines, lineToArr, lineToIntArr, strToEmptyLineGroups } = require('../../utils/input');
const { arrIntersects, arrDiff, countInstances, sort } = require('../../utils/array');
const { lcm, gcd, gauss } = require('../../utils/math');
const { outResult, outDebug, outProgress } = require('../../utils/output');

const findFactorial = (target, overshoot = true) => {
  let result = 2;
  let factorial = gauss(2);
  while (factorial < target) factorial = gauss(++result);

  return overshoot ? result : result - 1;
};

const [xInput, yInput] = getInput().split(', ');
const [, xRange] = xInput.split('=');
const [targetXMin, targetXMax] = xRange.split('..').map((x) => parseInt(x, 10));
const [, yRange] = yInput.split('=');
const [targetYMin, targetYMax] = yRange.split('..').map((y) => parseInt(y, 10));
const xOptions = {};
const yOptions = {};

// Trajectories that stop on X axis within bounds
const minXTrajectory = findFactorial(targetXMin, true);
const maxXTrajectory = findFactorial(targetXMax, false);

// Mark X trajectories that stop within target area
for (let x = minXTrajectory; x <= maxXTrajectory; x++) xOptions[x] = { stops: true };

// Find all X trajectories that get to target in 1 step
let xOneStep = targetXMax - targetXMin + 1;

// Find all Y trajectories, that get to target in 1 step
let yOneStep = targetYMax - targetYMin + 1;

// All x and y trajectories with 1 step will be compatible combinations
let result = xOneStep * yOneStep;

// Find all X trajectories that get to target in n steps, where n > 1
for (let x = minXTrajectory; x <= targetXMax / 2; x++) {
  let steps = 0;
  let pos = 0;
  let prev = 0;

  // Find min X steps
  while (pos < targetXMin) {
    pos += x - steps++;

    if (pos >= targetXMin && pos <= targetXMax) {
      xOptions[x] = xOptions[x] || {};
      xOptions[x]['min'] = steps;
      xOptions[x]['max'] = steps;

      // Find max X steps
      while (prev !== pos && pos <= targetXMax) {
        prev = pos;
        pos += x - steps++;

        if (pos <= targetXMax) xOptions[x]['max'] = steps;
      }
    }
  }
}

// Find all Y trajectories that get to target in n steps, where n > 1
for (let y = Math.abs(targetYMin); y > targetYMax; y--) {
  let steps = 0;
  let pos = 0;

  // Find min Y steps
  while (pos > targetYMax) {
    pos += y - steps++;

    if (pos <= targetYMax && pos >= targetYMin) {
      yOptions[y] = {
        min: steps,
        max: steps,
      };

      // Find max Y steps
      while (pos >= targetYMin) {
        pos += y - steps++;

        if (pos >= targetYMin) yOptions[y]['max'] = steps;
      }
    }
  }
}

// Combine all trajectories
for (const [x, { min: minXSteps, max: maxXSteps, stops }] of Object.entries(xOptions)) {
  for (const [y, { min: minYSteps, max: maxYSteps }] of Object.entries(yOptions)) {
    // if X min or max steps are within Y min and max steps required
    const stepsInterlace = minYSteps <= maxXSteps && minXSteps <= maxYSteps;
    // if X stops within target, check that Y max steps are past X min steps
    const xStopsSoonEnough = stops && minXSteps <= maxYSteps;

    if (stepsInterlace || xStopsSoonEnough) result++;
  }
}

outResult(result);
