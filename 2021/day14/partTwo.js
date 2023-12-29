const { getInput, strToLines, lineToArr, lineToIntArr, strToEmptyLineGroups } = require('../../utils/input');
const { arrIntersects, arrDiff, countInstances, sort } = require('../../utils/array');
const { outResult, outDebug } = require('../../utils/output');

const input = strToLines(getInput());
let polymer = input[0];
let pairs = {};
const rules = Object.fromEntries(input.slice(2).map((str) => str.split(' -> ')));

// Initial Pairs
for (let i = 1; i < polymer.length; i++) {
  const pair = polymer[i - 1] + polymer[i];

  if (!(pair in pairs)) pairs[pair] = 0;
  pairs[pair] += 1;
}

// Mutate pairs
for (let step = 0; step < 40; step++) {
  let newPairs = {};

  for (const [pair, cnt] of Object.entries(pairs)) {
    // Each pair that has an existing rule will split into 2 new pairs
    if (pair in rules) {
      const pair1 = pair[0] + rules[pair];
      const pair2 = rules[pair] + pair[1];

      if (!(pair1 in newPairs)) newPairs[pair1] = 0;
      if (!(pair2 in newPairs)) newPairs[pair2] = 0;

      newPairs[pair1] += cnt;
      newPairs[pair2] += cnt;
    }
  }

  pairs = { ...newPairs };
}

const charCounts = {};

for (const [pair, cnt] of Object.entries(pairs)) {
  if (!(pair[0] in charCounts)) charCounts[pair[0]] = 0;
  if (!(pair[1] in charCounts)) charCounts[pair[1]] = 0;

  charCounts[pair[0]] += cnt;
  charCounts[pair[1]] += cnt;
}

let leastCommon = Infinity;
let mostCommon = 0;

Object.values(charCounts).forEach((count) => {
  // Rounding error due to first and last character in polymer chain occurring only once
  let realCount = Math.ceil(count / 2);

  if (realCount < leastCommon) leastCommon = realCount;
  if (realCount > mostCommon) mostCommon = realCount;
});

outResult(mostCommon - leastCommon);
