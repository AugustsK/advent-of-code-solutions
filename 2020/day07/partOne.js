const { getInput, strToLines, lineToArr, lineToIntArr, strToEmptyLineGroups } = require('../../utils/input');
const { arrDiff, arrIntersects } = require('../../utils/array');
const { outResult, outDebug } = require('../../utils/output');

let canContainShinyGold = new Set();
const map = new Map();
strToLines(getInput()).forEach((rule) => {
  let [bag, contain] = rule.split(' bags contain ');

  if (contain !== 'no other bags.') {
    contain = contain
      .slice(0, -1)
      .split(', ')
      .map((bagCount) => {
        const count = parseInt(bagCount.slice(0, 1), 10);
        let bagType = bagCount.replace(`${count} `, '');

        if (bagType.slice(-1) !== 's') {
          bagType += 's';
        }

        bagType = bagType.replace(' bags', '');

        if (bagType === 'shiny gold') {
          canContainShinyGold.add(bag);
        }

        return {
          count,
          bagType,
        };
      });

    map.set(bag, contain);
  }
});

const findWhichContains = (bag) => {
  const result = [];

  map.forEach((contains, bagType) => {
    if (contains.filter((b) => b.bagType === bag).length) {
      result.push(bagType);
    }
  });

  return result;
};

const findParents = (arr) => {
  arr.forEach((bag) => {
    const canContain = findWhichContains(bag);

    if (canContain.length) {
      canContainShinyGold = new Set([...Array.from(canContainShinyGold), ...canContain]);
      findParents(canContain);
    }
  });
};

findParents(Array.from(canContainShinyGold));

outResult(canContainShinyGold.size);
