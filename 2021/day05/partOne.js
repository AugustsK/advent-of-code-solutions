const { getInput, strToLines, lineToArr, lineToIntArr } = require('../../utils/input');
const { outResult, outDebug } = require('../../utils/output');

const lines = strToLines(getInput());
const activePoints = new Set();
const intersectPoints = new Set();

const addPoint = point => {
    if (activePoints.has(point)) {
        if (!intersectPoints.has(point)) {
            intersectPoints.add(point);
        }
    } else {
        activePoints.add(point);
    }
}

lines.forEach(line => {
    const [startCoords, endCoords] = line.split(' -> ');
    const [x1, y1] = startCoords.split(',').map(coord => parseInt(coord, 10));
    const [x2, y2] = endCoords.split(',').map(coord => parseInt(coord, 10));

    if (x1 === x2 || y1 === y2) {
        if (x1 < x2) {
            for (let i = x1; i <= x2; i++) {
                addPoint(`${i}:${y1}`)
            }
        } else if (x2 < x1) {
            for (let i = x2; i <= x1; i++) {
                addPoint(`${i}:${y1}`)
            }
        } else if (y1 < y2) {
            for (let i = y1; i <= y2; i++) {
                addPoint(`${x1}:${i}`)
            }
        } else if (y2 < y1) {
            for (let i = y2; i <= y1; i++) {
                addPoint(`${x1}:${i}`)
            }
        }
    }
});

outResult(intersectPoints.size);
