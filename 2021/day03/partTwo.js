const { getInput, strToLines, lineToArr, lineToIntArr } = require('../../utils/input');
const { outResult, outDebug } = require('../../utils/output');

const list = strToLines(getInput());
let result = 0;
let o2GenRating = [...list];
let co2ScrubRating = [...list]
let pos = 0;

while (o2GenRating.length > 1) {
    let bits = o2GenRating.map(bits => bits[pos]);
    let ones = bits.filter(bit => bit === '1').length;
    let zeroes = bits.filter(bit => bit === '0').length;

    if (ones >= zeroes) {
        o2GenRating = o2GenRating.filter(bits => bits[pos] === '1');
    } else {
        o2GenRating = o2GenRating.filter(bits => bits[pos] === '0');
    }

    pos++;
}

pos = 0;

while (co2ScrubRating.length > 1) {
    let bits = co2ScrubRating.map(bits => bits[pos]);
    let ones = bits.filter(bit => bit === '1').length;
    let zeroes = bits.filter(bit => bit === '0').length;

    if (zeroes <= ones) {
        co2ScrubRating = co2ScrubRating.filter(bits => bits[pos] === '0');
    } else {
        co2ScrubRating = co2ScrubRating.filter(bits => bits[pos] === '1');
    }

    pos++;
}

result = parseInt(o2GenRating[0], 2) * parseInt(co2ScrubRating[0], 2);

outResult(result);
