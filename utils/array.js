const arrIntersects = (arr1, ...arr2) => {
  const arr3 = arr2.pop();
  const intersection = arr1.filter((x) => arr3.includes(x));

  if (arr2.length) return arrIntersects(intersection, ...arr2);

  return intersection;
};

const arrDiff = (arr1, arr2) => {
  return arr1.filter((x) => !arr2.includes(x));
};

const countInstances = (arr, char) => {
  return arr.filter((x) => x.includes(char)).length;
};

const sort = (arr) => {
  return arr.sort((a, b) => (a < b ? -1 : b > a ? 1 : 0));
};

const first = (arr) => arr[0];

const last = (arr) => arr[arr.length - 1];

module.exports = {
  arrIntersects,
  arrDiff,
  countInstances,
  sort,
  first,
  last,
};
