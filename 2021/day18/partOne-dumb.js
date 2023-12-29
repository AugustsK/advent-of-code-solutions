const Utils = require('../../utils');

const memo = new Map();
const state = {
  reduceIterator: 0,
  hasExploded: {},
};

const getPairsLikeAnIdiot = (str) => {
  if (memo.has(str)) return memo.get(str);

  let pair = null;

  if (/^\[/.test(str) && /]$/.test(str)) {
    let buffer = str.slice(1).slice(0, -1);
    let depth = 0;
    let commaIndex = -1;

    for (let i = 0; i < buffer.length; i++) {
      switch (buffer[i]) {
        case '[':
          depth++;

          break;
        case ']':
          depth--;

          break;
        case ',':
          if (depth === 0) commaIndex = i;
      }
    }

    const a = buffer.slice(0, commaIndex);
    const b = buffer.slice(commaIndex + 1);
    pair = [/^[0-9]+$/.test(a) ? parseInt(a, 10) : getPairs(a), /^[0-9]+$/.test(b) ? parseInt(b, 10) : getPairs(b)];
  }

  memo.set(str, pair);

  return pair;
};

const getPairs = (str) => {
  const key = `pairs:${str}`;

  if (memo.has(key)) return memo.get(key);

  let pair = JSON.parse(str);

  memo.set(key, pair);

  return pair;
};

const flatten = (arr) => {
  const key = `flat:${JSON.stringify(arr, null, 0)}`;

  if (memo.has(key)) return memo.get(key);

  let flat = arr.flat();

  memo.set(key, flat);

  return flat;
};

const findToSplit = (arr) => {
  let match = null;

  arr.some((x) => {
    if (Array.isArray(x)) {
      match = findToSplit(x);
    } else if (x >= 10) {
      match = x;
    }

    return match;
  });

  return match;
};

const split = (pairs) => {
  const firstHighest = findToSplit(pairs);

  let buffer = JSON.stringify(pairs, null, 0);

  if (firstHighest) {
    let a = Math.floor(firstHighest / 2);
    let b = Math.ceil(firstHighest / 2);

    buffer = buffer.replace(firstHighest, `[${a},${b}]`);
    Utils.Output.outDebug(`           Split ${firstHighest}: ${buffer}`);
  }

  return buffer;
};

const markExplode = (pairs, curDepth = 1) => {
  let [a, b] = pairs;

  if (Array.isArray(a)) a = markExplode(a, curDepth + 1);
  else if (curDepth > 4 && !state.hasExploded[state.reduceIterator] && !Array.isArray(b)) a = `expL:${a}`;

  if (Array.isArray(b)) b = markExplode(b, curDepth + 1);
  else if (curDepth > 4 && !state.hasExploded[state.reduceIterator] && !Array.isArray(a)) b = `expR:${b}`;

  if (flatten([a, b]).some((x) => /^exp/.test(x))) state.hasExploded[state.reduceIterator] = true;

  return [a, b];
};

const explode = (pairs) => {
  let buffer = JSON.stringify(markExplode(pairs), null, 0);

  Utils.Output.outDebug(`  Explode marked ${state.reduceIterator}: ${buffer}`);

  let leftNumIndex = -1;
  let leftNum = null;
  let rightNumIndex = -1;
  let rightNum = null;
  let explPairIndex = -1;
  let expMatch;
  let hasExplosion;

  for (let i = 0; i < buffer.length; i++) {
    if (/[0-9]/.test(buffer[i])) {
      if (explPairIndex === -1) {
        leftNumIndex = i;
        leftNum = parseInt(buffer.slice(i).match(/^([0-9]+)/)[0], 10);
      } else if (explPairIndex > -1 && rightNumIndex === -1) {
        rightNumIndex = i;
        rightNum = parseInt(buffer.slice(i).match(/^([0-9]+)/)[0], 10);
      }
    } else if (buffer[i] === 'e') {
      expMatch = buffer.match(/(\["expL:([0-9]+)","expR:([0-9]+)"])/);
      hasExplosion = expMatch && Array.isArray(expMatch);
      explPairIndex = i - 2;
      i = hasExplosion ? explPairIndex + expMatch[0].length : i;
    }
  }

  if (hasExplosion) {
    let [expMatchStr, , leftInc, rightInc] = expMatch;
    leftNum += parseInt(leftInc, 10);
    rightNum += parseInt(rightInc, 10);

    if (leftNumIndex > -1) {
      buffer = buffer.slice(0, leftNumIndex) + '<' + buffer.slice(leftNumIndex + 1);
    }

    if (rightNumIndex > -1) {
      buffer = buffer.slice(0, rightNumIndex) + '>' + buffer.slice(rightNumIndex + 1);
    }

    buffer = buffer.replace(expMatchStr, '0').replace('<', leftNum).replace('>', rightNum);

    Utils.Output.outDebug(`Explode resolved ${state.reduceIterator}: ${buffer}`);
  }

  return buffer;
};

const reduce = (num) => {
  state.hasExploded[++state.reduceIterator] = false;
  Utils.Output.outDebug(`          Reduce ${state.reduceIterator}: ${num}`);
  const pairs = getPairs(num);

  let result = explode(pairs);

  if (result === num) result = split(pairs);
  if (result === num) return result;

  if (result.includes('expL:expL')) throw 'Es visu sapisu kkur...';

  //return result;
  return reduce(result);
};

const add = (a, b) => {
  return reduce(`[${a},${b}]`);
};

const numbers = Utils.Input.strToLines(Utils.Input.getInput());
let resultSnail = numbers[0];

for (let i = 1; i < numbers.length; i++) {
  resultSnail = add(resultSnail, numbers[i]);
}

//Utils.Output.outDebug(resultSnail);
Utils.Output.outResult(resultSnail);
