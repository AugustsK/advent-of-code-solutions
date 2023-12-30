import type { Coords } from '../../types';

import { InputUtil, OutputUtil, MathUtil, ArrayUtil } from '../../utils';

const [timesRaw, distanceRaw] = InputUtil.strToLines(InputUtil.getInput());
const times = timesRaw
  .replace('Time: ', '')
  .split(' ')
  .filter((val) => !!val.trim())
  .map((val) => parseInt(val, 10));

const distances = distanceRaw
  .replace('Distance: ', '')
  .split(' ')
  .filter((val) => !!val.trim())
  .map((val) => parseInt(val, 10));

const variations = times.map((time, idx) => {
  const distance = distances[idx];
  let x = Math.floor(time / 2);
  let y = Math.ceil(time / 2);
  let variants = 0;

  if (x === y && x * y > distance) {
    variants += 1;
    x -= 1;
    y += 1;
  }

  while (x * y > distance) {
    variants += 2;
    x -= 1;
    y += 1;
  }

  return variants;
});

let partOne = variations.reduce((sum, cur) => sum * cur, 1);

const totalTime = parseInt(timesRaw.replace('Time: ', '').replace(/\s/g, ''), 10);
const totalDistance = parseInt(distanceRaw.replace('Distance: ', '').replace(/\s/g, ''), 10);
let x = Math.floor(totalTime / 2);
let y = Math.ceil(totalTime / 2);
let variants = 0;

if (x === y && x * y > totalDistance) {
  variants += 1;
  x -= 1;
  y += 1;
}

while (x * y > totalDistance) {
  variants += 2;
  x -= 1;
  y += 1;
}

let partTwo = variants;

OutputUtil.outResult(partOne);
OutputUtil.outResult(partTwo);
