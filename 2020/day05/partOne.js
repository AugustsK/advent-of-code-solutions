const { getInput, strToLines, lineToArr, lineToIntArr } = require('../../utils/input');
const { arrDiff, arrIntersects } = require('../../utils/array');
const { outResult, outDebug } = require('../../utils/output');

const ROWS = [0, 127];
const COLUMNS = [0, 7];
const bPasses = strToLines(getInput());
let result = 0;

bPasses.forEach((boardingPass) => {
  let row = [...ROWS];
  let column = [...COLUMNS];

  for (let i = 0; i < 7; i++) {
    let [min, max] = row;
    let half = min + Math.floor((max - min) / 2);

    if (boardingPass[i] === 'B') row = [half + 1, max];
    else row = [min, half];
  }

  for (let i = 7; i < 10; i++) {
    let [min, max] = column;
    let half = min + Math.floor((max - min) / 2);

    if (boardingPass[i] === 'R') column = [half + 1, max];
    else column = [min, half];
  }

  const seatId = row[0] * 8 + column[0];

  if (seatId > result) result = seatId;
});

outResult(result);
