const Utils = require('../../utils');

const UP = 'U';
const RIGHT = 'R';
const DOWN = 'D';
const LEFT = 'L';

const coords = (x, y) => `${x}-${y}`;

const tailVisits = new Set([coords(0, 0)]);
let H = [0, 0];
let T = [0, 0];

const resolveT = () => {
    const [hX, hY] = H;
    const [tX, tY] = T;
    const xDiffAbs = Math.abs(hX - tX);
    const yDiffAbs = Math.abs(hY - tY);
    let xDiff = 0;
    let yDiff = 0;

    if (xDiffAbs > 1 && yDiffAbs === 0) {
        xDiff = (hX - tX) / 2;
    } else if (yDiffAbs > 1 && xDiffAbs === 0) {
        yDiff = (hY - tY) / 2;
    } else if (xDiffAbs > 1 && yDiffAbs === 1) {
        xDiff = (hX - tX) / 2;
        yDiff = hY - tY;
    } else if (yDiffAbs > 1 && xDiffAbs === 1) {
        xDiff = hX - tX;
        yDiff = (hY - tY) / 2;
    }

    T = [tX + xDiff, tY + yDiff];
    tailVisits.add(coords(...T));
}

const move = (dir, amount) => {
    if (amount === 0) return;

    const [hX, hY] = H;

    switch (dir) {
        case UP:
            H = [hX, hY - 1];
            resolveT();

            break;
        case RIGHT:
            H = [hX + 1, hY];
            resolveT();

            break;
        case DOWN:
            H = [hX, hY + 1];
            resolveT();

            break;
        case LEFT:
            H = [hX - 1, hY];
            resolveT();

            break;
    }

    move(dir, amount - 1);
}

Utils.Input.strToLines(Utils.Input.getInput()).filter(line => line.length).forEach(line => {
    const [ dir, amountStr ] = line.split(' ');
    const amount = parseInt(amountStr, 10);

    move(dir, amount);
});

let partOne = tailVisits.size;
let partTwo = 0;

Utils.Output.outResult(partOne);
Utils.Output.outResult(partTwo);
