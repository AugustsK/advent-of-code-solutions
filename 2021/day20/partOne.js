const Utils = require('../../utils');

// Initial State
const [ algorithm, , ...rawImage ] = Utils.Input.strToLines(Utils.Input.getInput());
const voidStateOdd = algorithm[0] === '#' ? true : null;
const voidStateEven = voidStateOdd && algorithm[511] === '#' ? true : null;
let image = new Set();
let bounds = { x: [0, rawImage[0].length - 1], y: [0, rawImage.length - 1] };
let voidState = null;

// Methods
const toStr = (...coords) => coords.join(',');

const growBounds = () => {
    bounds.x[0] -= 1;
    bounds.x[1] += 1;
    bounds.y[0] -= 1;
    bounds.y[1] += 1;

    if (voidState === true) {
        for (let x = bounds.x[0]; x <= bounds.x[1]; x++) {
            image.add(toStr(x, bounds.y[0]));
            image.add(toStr(x, bounds.y[1]));
        }

        for (let y = bounds.y[0] + 1; y < bounds.y[1]; y++) {
            image.add(toStr(bounds.x[0], y));
            image.add(toStr(bounds.x[1], y));
        }
    }
}

const inVoid = (x, y) => y < bounds.y[0] || y > bounds.y[1] || x < bounds.x[0] || x > bounds.x[1];

const readArea = (sX, sY) => {
    let area = '';

    for (let y = sY - 1; y <= sY + 1; y++) {
        for (let x = sX - 1; x <= sX + 1; x++) {
            const isInVoid = inVoid(x, y);

            area += image.has(toStr(x, y)) || (isInVoid && voidState) ? '1' : '0';
        }
    }

    return parseInt(area, 2);
}

const iterate = (step) => {
    const newImage = new Set();
    growBounds();

    for (let y = bounds.y[0]; y <= bounds.y[1]; y++) {
        for (let x = bounds.x[0]; x <= bounds.x[1]; x++) {
            const areaVal = readArea(x, y);

            if (algorithm[areaVal] === '#') newImage.add(toStr(x, y));
        }
    }

    image = newImage;
    voidState = step % 2 === 0 ? voidStateEven : voidStateOdd;
    drawArea(step);
}

const drawArea = (step) => {
    if (Utils.Input.debugEnabled()) {
        Utils.Output.outDebug('');
        Utils.Output.outDebug(`After step ${step}: `);
        for (let y = bounds.y[0] - 1; y <= bounds.y[1] + 1; y++) {
            let line = '';

            for (let x = bounds.x[0] - 1; x <= bounds.x[1] + 1; x++) {
                const isInVoid = inVoid(x, y);

                line += image.has(toStr(x, y)) || (isInVoid && voidState) ? '#' : '.';
            }

            Utils.Output.outDebug(line);
        }
    }
}

// Map initial image
rawImage.forEach((line, y) => {
    for (let x = 0; x < line.length; x++) {
        if (line[x] === '#') image.add(toStr(x, y));
    }
});

drawArea(0);

for (let step = 1; step <= 2; step++) iterate(step);

Utils.Output.outResult(image.size);
