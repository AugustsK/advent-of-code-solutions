const Utils = require('../../utils');

const toStr = (...parts) => parts.join('.');

const initSteps = Utils.Input.strToLines(Utils.Input.getInput()).map(line => {
    // I really hate regex, so let's do bunch of string splitting instead
    const [ toggle, rawCoordRangeStr ] = line.split(' ');
    const [ xRange, yRange, zRange ] = rawCoordRangeStr.split(',');
    const xMinAndMax = xRange.split('=')[1];
    const yMinAndMax = yRange.split('=')[1];
    const zMinAndMax = zRange.split('=')[1];

    const [ xMin, xMax ] = xMinAndMax.split('..');
    const [ yMin, yMax ] = yMinAndMax.split('..');
    const [ zMin, zMax ] = zMinAndMax.split('..');

    return {
        toggle: toggle === 'on',
        x: [ parseInt(xMin, 10), parseInt(xMax, 10) ],
        y: [ parseInt(yMin, 10), parseInt(yMax, 10) ],
        z: [ parseInt(zMin, 10), parseInt(zMax, 10) ]
    };

});

const MIN_COORD = -50;
const MAX_COORD = 50;
let activeCubes = new Set();

const toggleCubes = (toggle = true, [ xMin, xMax ], [ yMin, yMax ], [ zMin, zMax ]) => {
    for (let x = Math.max(xMin, MIN_COORD); x <= Math.min(xMax, MAX_COORD); x++) {
        for (let y = Math.max(yMin, MIN_COORD); y <= Math.min(yMax, MAX_COORD); y++) {
            for (let z = Math.max(zMin, MIN_COORD); z <= Math.min(zMax, MAX_COORD); z++) {
                if (!toggle) activeCubes.delete(toStr(x, y, z));
                else if (toggle) activeCubes.add(toStr(x, y, z));
            }
        }
    }
};

initSteps.forEach(({ toggle, x, y, z }) => toggleCubes(toggle, x, y, z));

let partOne = activeCubes.size;

Utils.Output.outResult(partOne);
