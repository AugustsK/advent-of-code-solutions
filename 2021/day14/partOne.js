const { getInput, strToLines, lineToArr, lineToIntArr, strToEmptyLineGroups } = require('../../utils/input');
const { arrIntersects, arrDiff, countInstances, sort } = require('../../utils/array');
const { outResult, outDebug } = require('../../utils/output');

const input = strToLines(getInput());
let polymer = input[0];
const rules = Object.fromEntries(input.slice(2).map((str) => str.split(' -> ')));

for (let step = 0; step < 10; step++) {
  let newPolymer = '';

  for (let i = 0; i < polymer.length - 1; i++) {
    const pair = polymer[i] + polymer[i + 1];

    newPolymer += polymer[i];

    if (pair in rules) newPolymer += rules[pair];
  }

  polymer = newPolymer + polymer.slice(-1);
}

const polymerArr = polymer.split('');
const allChars = new Set(polymerArr);

let leastOccurances = Infinity;
let mostOccurances = 0;

allChars.forEach((char) => {
  const occurances = polymerArr.filter((polyChar) => polyChar === char).length;

  if (occurances < leastOccurances) leastOccurances = occurances;
  if (occurances > mostOccurances) mostOccurances = occurances;
});

outResult(mostOccurances - leastOccurances);
