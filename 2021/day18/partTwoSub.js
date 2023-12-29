const { workerData, parentPort } = require('worker_threads');
const { v4: uuidv4 } = require('uuid');

let state = {
  reduceIterator: 0,
  hasExploded: {},
  refs: new Map(),
};

const getNumber = (ref) => state.refs.get(ref);

const setNumber = (num, existing = null) => {
  const ref = existing || uuidv4();

  state.refs.set(ref, num);

  return ref;
};

const rmNumber = (ref) => state.refs.delete(ref);

const getPairs = (str) => JSON.parse(str);

const parsePairs = (pairs) => JSON.stringify(pairs, null, 0);

const split = (pairs) => {
  const flat = pairs.flat(Infinity);
  let buffer = parsePairs(pairs);

  flat.some((ref) => {
    const num = getNumber(ref);

    if (num >= 10) {
      const firstHalf = setNumber(Math.floor(num / 2));
      const secondHalf = setNumber(Math.ceil(num / 2));
      rmNumber(ref);
      buffer = buffer.replace(`"${ref}"`, parsePairs([firstHalf, secondHalf]));

      return true;
    }

    return false;
  });

  return buffer;
};

const markExplode = (pairs, curDepth = 1) => {
  let [a, b] = pairs;

  if (!Array.isArray(a) && !Array.isArray(b) && curDepth > 4 && !state.hasExploded[state.reduceIterator]) {
    state.hasExploded[++state.reduceIterator] = true;

    return `${a}|${b}`;
  }

  return [Array.isArray(a) ? markExplode(a, curDepth + 1) : a, Array.isArray(b) ? markExplode(b, curDepth + 1) : b];
};

const explode = (pairs) => {
  const exploded = markExplode(pairs);
  const flat = exploded.flat(Infinity);
  let buffer = parsePairs(exploded);

  if (flat.some((x) => x.includes('|'))) {
    const expIndex = flat.findIndex((x) => x.includes('|'));
    const [leftIncRef, rightIncRef] = ('' + flat[expIndex]).split('|');
    const leftRef = expIndex - 1 > -1 ? flat[expIndex - 1] : null;
    const rightRef = expIndex + 1 < flat.length ? flat[expIndex + 1] : null;

    if (leftRef) setNumber(getNumber(leftRef) + getNumber(leftIncRef), leftRef);
    if (rightRef) setNumber(getNumber(rightRef) + getNumber(rightIncRef), rightRef);

    rmNumber(leftIncRef);
    rmNumber(rightIncRef);
    buffer = buffer.replace(`"${flat[expIndex]}"`, `"${setNumber(0)}"`);
  }

  return buffer;
};

const reduce = (pairs) => {
  const str = parsePairs(pairs);

  state.hasExploded[++state.reduceIterator] = false;

  let result = explode(pairs);

  if (result === str) result = split(pairs);
  if (result === str) return result;

  return reduce(getPairs(result));
};

const mapNumberToRef = (pairs) => {
  return pairs.map((x) => {
    if (!Array.isArray(x)) return setNumber(parseInt(x, 10));

    return mapNumberToRef(x);
  });
};

const mapRefToNumber = (str) => {
  let buffer = '' + str;

  state.refs.forEach((value, ref) => (buffer = buffer.replace(`"${ref}"`, '' + value)));

  return buffer;
};

const magnitude = (pairs) => {
  let [a, b] = pairs;

  if (Array.isArray(a)) a = magnitude(a);
  if (Array.isArray(b)) b = magnitude(b);

  return a * 3 + b * 2;
};

const add = (a, b) => {
  const pairs = mapNumberToRef(getPairs(`[${a},${b}]`));

  return magnitude(getPairs(mapRefToNumber(reduce(pairs))));
};

const result = add(workerData.a, workerData.b);

parentPort.postMessage(result);
