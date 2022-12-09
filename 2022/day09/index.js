const Utils = require('../../utils');

const UP = 'U';
const RIGHT = 'R';
const DOWN = 'D';
const LEFT = 'L';

const coords = (x, y) => `${x}-${y}`;

const tailVisits = new Set([coords(0, 0)]);
const longTailVisits = new Set([coords(0, 0)]);
let H = [0, 0];
let T = [0, 0];
let knots = [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0]
];

const resolveT = (head, knots) => {
    let curHead = head;

    return knots.map(curKnot => {
        const [hX, hY] = curHead;
        const [tX, tY] = curKnot;
        const xDiffAbs = Math.abs(hX - tX);
        const yDiffAbs = Math.abs(hY - tY);
        let xDiff = 0;
        let yDiff = 0;

        if (xDiffAbs > 1) {
            xDiff = (hX - tX) / 2;
        } else if (xDiffAbs === 1 && yDiffAbs > 1) {
            xDiff = hX - tX;
        }

        if (yDiffAbs > 1) {
            yDiff = (hY - tY) / 2;
        } else if (yDiffAbs === 1 && xDiffAbs > 1) {
            yDiff = hY - tY;
        }

        const newKnot = [tX + xDiff, tY + yDiff];

        curHead = [...newKnot];

        return newKnot;
    });
}

const move = (dir, amount) => {
    if (amount === 0) return;

    const [hX, hY] = H;

    switch (dir) {
        case UP:
            H = [hX, hY - 1];

            break;
        case RIGHT:
            H = [hX + 1, hY];

            break;
        case DOWN:
            H = [hX, hY + 1];

            break;
        case LEFT:
            H = [hX - 1, hY];

            break;
    }

    T = resolveT(H, [T])[0];
    knots = resolveT(H, knots);
    tailVisits.add(coords(...T));
    longTailVisits.add(coords(...knots[knots.length - 1]));

    move(dir, amount - 1);
}

Utils.Input.strToLines(Utils.Input.getInput()).filter(line => line.length).forEach(line => {
    const [ dir, amountStr ] = line.split(' ');
    const amount = parseInt(amountStr, 10);

    move(dir, amount);
});

let partOne = tailVisits.size;
let partTwo = longTailVisits.size;

Utils.Output.outResult(partOne);
Utils.Output.outResult(partTwo);
