const { getInput, strToLines, lineToArr, lineToIntArr } = require('../../utils/input');
const { outResult, outDebug } = require('../../utils/output');

// Constants
const DIRECTIONS = ['ne', 'e', 'se', 'sw', 'w', 'nw'];
const REFERENCE = [0, 0, 0];

// Setup vars
const instructions = strToLines(getInput());
let grid = new Set();

// Methods
const coordsToString = ([q, r, s]) => `${q}:${r}:${s}`;

const coordsToArr = str => str.split(':').map(x => parseInt(x, 10));

const navigate = {
    ne: ([q, r, s]) => [q + 1, r - 1, s],
    e: ([q, r, s]) => [q + 1, r, s - 1],
    se: ([q, r, s]) => [q, r + 1, s - 1],
    sw: ([q, r, s]) => [q - 1, r + 1, s],
    w: ([q, r, s]) => [q - 1, r, s + 1],
    nw: ([q, r, s]) => [q, r - 1, s + 1]
};

const walkInstruction = instruction => {
    let coords = [...REFERENCE];
    let buffer = '' + instruction;

    while (buffer) {
        DIRECTIONS.some(direction => {
            if (buffer.startsWith(direction)) {
                buffer = buffer.slice(direction.length);
                coords = navigate[direction](coords);

                return true;
            }
        })
    }

    return coords;
}

const countBlackNeighbours = (coordStr, subFn) => {
    let blackNeighbours = 0;

    DIRECTIONS.forEach(direction => {
        const neighbourCoords = coordsToString(navigate[direction](coordsToArr(coordStr)));

        if (grid.has(neighbourCoords)) {
            blackNeighbours += 1;
        } else if (typeof subFn === 'function') {
            subFn(neighbourCoords);
        }
    });

    return blackNeighbours;
}

// Processing initial grid
instructions.forEach(instruction => {
    const coordArr = walkInstruction(instruction);
    const coords = coordsToString(coordArr);

    if (grid.has(coords)) {
        grid.delete(coords);
    } else {
        grid.add(coords);
    }
});

// Mutating
for (let i = 1; i <= 100; i++) {
    let whitesToFlip = [];
    let blacksToFlip = [];

    for (let blackTile of grid.values()) {
        let blackNeighbours = countBlackNeighbours(blackTile, (neighbourCoords) => {
            let subBlackNeighbours = countBlackNeighbours(neighbourCoords);

            if (subBlackNeighbours === 2) {
                whitesToFlip.push(neighbourCoords);
            }
        });

        if (blackNeighbours === 0 || blackNeighbours > 2) {
            blacksToFlip.push(blackTile);
        }
    }

    whitesToFlip.forEach(coords => grid.add(coords));
    blacksToFlip.forEach(coords => grid.delete(coords));

    outDebug(`${grid.size} black tiles after ${i} days`);
}

let result = grid.size;

outResult(result);
