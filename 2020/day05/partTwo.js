const { getInput, strToLines, lineToArr, lineToIntArr } = require('../../utils/input');
const { arrDiff, arrIntersects } = require('../../utils/array');
const { outResult, outDebug } = require('../../utils/output');

const getSeatId = (row, column) => row * 8 + column;

const ROWS = [0, 127];
const COLUMNS = [0, 7];
const bPasses = strToLines(getInput());
let allSeatIds = [];
let result = 0;

bPasses.forEach(boardingPass => {
    let row = [...ROWS];
    let column = [...COLUMNS];

    for (let i = 0; i < 7; i++) {
        let [ min, max ] = row;
        let half = min + Math.floor((max - min) / 2);

        if (boardingPass[i] === 'B') row = [ half + 1, max ];
        else row = [ min, half ];
    }

    for (let i = 7; i < 10; i++) {
        let [ min, max ] = column;
        let half = min + Math.floor((max - min) / 2);

        if (boardingPass[i] === 'R') column = [ half + 1, max ];
        else column = [ min, half ];
    }

    allSeatIds.push(getSeatId(row[0], column[0]));
});

allSeatIds.sort((a, b) => a < b ? -1 : b > a ? 1 : 0).some((seatId, i, arr) => {
    if (seatId + 1 !== arr[i + 1]) {
        return result = seatId + 1;
    }
});

outResult(result);
