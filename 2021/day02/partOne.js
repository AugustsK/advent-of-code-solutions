const { getInput, strToLines, lineToArr, lineToIntArr } = require('../../utils/input');
const { outResult, outDebug } = require('../../utils/output');

const list = strToLines(getInput());
let result = 0;
let x = 0;
let y = 0;

list.forEach((item, i, arr) => {
  let [direction, amount] = item.split(' ');

  amount = parseInt(amount, 10);

  switch (direction) {
    case 'forward':
      x += amount;
      break;
    case 'down':
      y += amount;
      break;
    case 'up':
      y -= amount;
      break;
  }
});

result = x * y;

outResult(result);
