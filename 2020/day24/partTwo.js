const { getInput, strToLines, lineToArr, lineToIntArr } = require('../utils/input');
const { outResult, outDebug } = require('../utils/output');

// Constants
const DIRECTIONS = ['ne', 'e', 'se', 'sw', 'w', 'nw'];
const BLACK = 'black';
const WHITE = 'white';
const REFERENCE = [0, 0, 0];

// Setup vars
const instructions = strToLines(getInput());
let grid = {};
let bounds = {
    q: [-1, 1],
    r: [-1, 1],
    s: [-1, 1]
}

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

const pushBounds = ([q, r, s]) => {
    let [ qMin, qMax ] = bounds.q;
    let [ rMin, rMax ] = bounds.r;
    let [ sMin, sMax ] = bounds.s;

    qMin = q === qMin ? qMin - 1 : qMin;
    qMax = q === qMax ? qMax + 1 : qMax;
    rMin = r === rMin ? rMin - 1 : rMin;
    rMax = r === rMax ? rMax + 1 : rMax;
    sMin = s === sMin ? sMin - 1 : sMin;
    sMax = s === sMax ? sMax + 1 : sMax;

    bounds.q = [qMin, qMax];
    bounds.r = [rMin, rMax];
    bounds.s = [sMin, sMax];
}

const fillGrid = () => {
    let [ qMin, qMax ] = bounds.q;
    let [ rMin, rMax ] = bounds.r;
    let [ sMin, sMax ] = bounds.s;

    for (let q = qMin; q <= qMax; q++) {
        for (let r = rMin; r <= rMax; r++) {
            for (let s = sMin; s <= sMax; s++) {
                const coords = coordsToString([q, r, s]);

                if (!(coords in grid)) {
                    grid[coords] = WHITE;
                }
            }
        }
    }
}

// Processing initial grid
grid[coordsToString(REFERENCE)] = WHITE;

instructions.forEach(instruction => {
    const coordArr = walkInstruction(instruction);
    const coords = coordsToString(coordArr);

    pushBounds(coordArr);

    if (coords in grid) {
        grid[coords] = grid[coords] === WHITE ? BLACK : WHITE;
    } else {
        grid[coords] = BLACK;
    }
});

fillGrid();

// Mutating
for (let i = 0; i < 100; i++) {
    let newGrid = {
        ...grid
    };

    for (const [coordStr, color] of Object.entries(grid)) {
        const coords = coordsToArr(coordStr);
        let blackNeighbours = 0;

        DIRECTIONS.forEach(direction => {
            const neighbourCoords = coordsToString(navigate[direction](coords));

            if (neighbourCoords in grid && grid[neighbourCoords] === BLACK) {
                blackNeighbours += 1;
            }
        });

        if (color === BLACK) {
            if (blackNeighbours === 0 || blackNeighbours > 2) {
                newGrid[coordStr] = WHITE;
            }
        } else {

        }
    }
}

let result = Object.values(grid).filter(color => color === BLACK).length;

outResult(result);
