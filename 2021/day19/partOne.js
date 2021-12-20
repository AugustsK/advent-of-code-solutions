const Utils = require('../../utils');
const {outDebug} = require("../../utils/output");

const scanners = {};

const vectorMagnitude = (x, y, z) => Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));

// Map raw scanner input
let scannerKey = null;
Utils.Input.strToLines(Utils.Input.getInput()).forEach(line => {
    if (line !== '') {
        if (line.includes('scanner')) {
            scannerKey = line;
            scanners[scannerKey] = [];
        } else {
            let [ x, y, z ] = line.split(',');

            x = parseInt(x, 10);
            y = parseInt(y, 10);
            z = parseInt(z, 10) ;

            scanners[scannerKey][line] = { x, y, z, str: line }
        }
    }
});

let composite = scanners['--- scanner 0 ---'];
let remaining = Object.values(scanners).filter(obj => obj.key !== '--- scanner 0 ---');
let composeBeacons = Object.values(composite.beacons).map(({ x, y, z }) => `${x},${y},${z}`);

remaining.forEach(scannerResult => {
    let scannerBeacons = Object.values(scannerResult.beacons).map(({ x, y, z }) => `${x},${y},${z}`);

    outDebug(Utils.Array.intersects(composeBeacons, scannerBeacons));
});

/**
 * x,y,z
 * x,-z,y
 * x,-y,-z
 * x,z,-y
 *
 * -x,-y,z
 * -x,-z,-y
 * -x,y,-z
 * -x,z,y
 *
 * -z,x,-y
 * y,x,-z
 * z,x,y
 * -y,x,z
 *
 * z,-x,-y
 * y,-x,z
 * -z,-x,y
 * -y,-x,-z
 *
 * -y,-z,x
 * z,-y,x
 * y,z,x
 * -z,y,x
 *
 * z,y,-x
 * -y,z,-x
 * -z,-y,-x
 * y,-z,-x
 */

Utils.Output.outResult(null);
