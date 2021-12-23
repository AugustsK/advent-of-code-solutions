const Utils = require('../../utils');

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

const common = (minA = 0, maxA = 0, minB = 0, maxB = 0) => {
    const min = Math.max(minA, minB);
    const max = Math.min(maxA, maxB);

    if (min <= max) return [ min, max ];

    return false;
};

const exclude = (cubeA, cubeInner) => {
    const cubes = [];
    const [ xMinA, xMaxA ] = cubeA.x;
    const [ yMinA, yMaxA ] = cubeA.y;
    const [ zMinA, zMaxA ] = cubeA.z;
    let [ xMinInner, xMaxInner ] = cubeInner.x;
    let [ yMinInner, yMaxInner ] = cubeInner.y;
    let [ zMinInner, zMaxInner ] = cubeInner.z;

    // Upper cube (x and y limited to inner)
    if (zMaxA > zMaxInner) cubes.push({ x: [xMinInner, xMaxInner], y: [yMinInner, yMaxInner], z: [zMaxInner + 1, zMaxA] });

    // Lower cube (x and y limited to inner)
    if (zMinA < zMinInner) cubes.push({ x: [xMinInner, xMaxInner], y: [yMinInner, yMaxInner], z: [zMinA, zMinInner - 1] });

    // Forward cube (x limited to inner)
    if (yMaxA > yMaxInner) cubes.push({ x: [xMinInner, xMaxInner], y: [yMaxInner + 1, yMaxA], z: [zMinA, zMaxA] });

    // Backward cube (x limited to inner)
    if (yMinA < yMinInner) cubes.push({ x: [xMinInner, xMaxInner], y: [yMinA, yMinInner - 1], z: [zMinA, zMaxA] });

    // Left cube (no limits)
    if (xMinA < xMinInner) cubes.push({ x: [xMinA, xMinInner - 1], y: [yMinA, yMaxA], z: [zMinA, zMaxA] });

    // Right cube (no limits)
    if (xMaxA > xMaxInner) cubes.push({ x: [xMaxInner + 1, xMaxA], y: [yMinA, yMaxA], z: [zMinA, zMaxA] })

    return cubes
};

const intersect = (cubeA, cubeB) => {
    const [ xMinA, xMaxA ] = cubeA.x;
    const [ yMinA, yMaxA ] = cubeA.y;
    const [ zMinA, zMaxA ] = cubeA.z;
    const [ xMinB, xMaxB ] = cubeB.x;
    const [ yMinB, yMaxB ] = cubeB.y;
    const [ zMinB, zMaxB ] = cubeB.z;
    const commonX = common(xMinA, xMaxA, xMinB, xMaxB);
    const commonY = common(yMinA, yMaxA, yMinB, yMaxB);
    const commonZ = common(zMinA, zMaxA, zMinB, zMaxB);

    if (!commonX || !commonY || !commonZ) return false;

    const commonCube = {
        x: commonX,
        y: commonY,
        z: commonZ
    };
    const uniqueCubes = exclude(cubeA, commonCube);

    return [ commonCube, uniqueCubes ];
};

const mapIntersect = (cubeA, cubeB) => {
    const intersectResult = intersect(cubeA, cubeB);

    if (intersectResult) return intersectResult[1];

    return cubeA;
}

const calcCubeSum = ({ x, y, z }) => {
    const [ xMin, xMax ] = x;
    const [ yMin, yMax ] = y;
    const [ zMin, zMax ] = z;

    return (xMax - xMin + 1) * (yMax - yMin + 1) * (zMax - zMin + 1);
};

const sumAllCubes = cubes => cubes.reduce((sum, cube) => sum + calcCubeSum(cube), 0);

let addedCubes = [];

initSteps.forEach(({ toggle, x: xA, y: yA, z: zA }) => {
    if (toggle) {
        let cubesToAdd = [{ x: xA, y: yA, z: zA }];

        addedCubes.forEach(cubeB => cubesToAdd = cubesToAdd.map(cubeA => mapIntersect(cubeA, cubeB)).flat());
        cubesToAdd.forEach(cube => addedCubes.push(cube));
    } else addedCubes = addedCubes.map((cubeA) => mapIntersect(cubeA, { x: xA, y: yA, z: zA })).flat();
});

Utils.Output.outResult(sumAllCubes(addedCubes));
