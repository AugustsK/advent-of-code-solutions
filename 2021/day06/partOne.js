const { getInput, strToLines, lineToArr, lineToIntArr } = require('../../utils/input');
const { outResult, outDebug } = require('../../utils/output');

let fishes = lineToIntArr(getInput());

for (let i = 0; i < 80; i++) {
  const newFishes = [];

  fishes = fishes.map((fish) => {
    let newVal = --fish;

    if (newVal < 0) {
      newFishes.push(8);
      newVal = 6;
    }

    return newVal;
  });

  fishes = [...fishes, ...newFishes];
}

outResult(fishes.length);
