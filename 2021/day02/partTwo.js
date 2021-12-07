const { getInput, strToLines, lineToArr, lineToIntArr } = require('../utils/input');
const { outResult, outDebug } = require('../utils/output');

const list = strToLines(getInput());
let result = 0;
let x = 0;
let y = 0;
let aim = 0;

list.forEach((item, i, arr) => {
    let [direction, amount] = item.split(' ');

    amount = parseInt(amount, 10);

    switch (direction) {
        case 'forward':
            x += amount;
            y += aim * amount;
            break;
        case 'down':
            aim += amount;
            break;
        case 'up':
            aim -= amount;
            break;
    }
});

result = x * y;

outResult(result);
