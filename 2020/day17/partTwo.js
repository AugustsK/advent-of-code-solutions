const Utils = require('../../utils');

let activeGrid = new Set();

const toStr = (...coords) => coords.join(':');

const toCoords = str => str.split(':').map(x => parseInt(x, 10));

const getActiveNeighbourCnt = (coords = []) => {
    const [ sX, sY, sZ, sW ] = coords;
    const inactiveToCheck = new Set();
    let activeNeighbourCnt = 0;

    for (let x = sX - 1; x <= sX + 1; x++) {
        for (let y = sY - 1; y <= sY + 1; y++) {
            for (let z = sZ - 1; z <= sZ + 1; z++) {
                for (let w = sW - 1; w <= sW + 1; w++) {
                    if (x !== sX || y !== sY || z !== sZ || w !== sW) {
                        if (activeGrid.has(toStr(x, y, z, w))) {
                            activeNeighbourCnt++;
                        } else {
                            inactiveToCheck.add(toStr(x, y, z, w));
                        }
                    }
                }
            }
        }
    }

    return {
        cnt: activeNeighbourCnt,
        inActives: inactiveToCheck
    };
};

const iterate = () => {
    const activeGridArr = Array.from(activeGrid);
    const newGrid = new Set();

    activeGridArr.forEach(coordStr => {
        const coords = toCoords(coordStr);
        const { cnt: activeNeighbours, inActives } = getActiveNeighbourCnt(coords);

        if (activeNeighbours >= 2 && activeNeighbours <= 3) newGrid.add(coordStr);

        Array.from(inActives).forEach(inActiveStr => {
            const inActiveCoords = toCoords(inActiveStr);
            const { cnt } = getActiveNeighbourCnt(inActiveCoords);

            if (cnt === 3) newGrid.add(inActiveStr);
        });
    });

    return newGrid;
};

// Map initial state
Utils.Input.strToLines(Utils.Input.getInput()).forEach((line, y) => {
    line.split('').forEach((state, x) => {
        if (state === '#') activeGrid.add(toStr(x, y, 0, 0));
    });
});

// Iterations
for (let step = 1; step <= 6; step++) activeGrid = iterate();

Utils.Output.outDebug(Array.from(activeGrid));
Utils.Output.outResult(activeGrid.size);
