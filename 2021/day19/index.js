const Utils = require('../../utils');

const scanners = {};

const toStr = (...parts) => parts.join(',');

const getRotations = (x, y, z) => {
  return [
    [x, y, z],
    [x, -z, y],
    [x, -y, -z],
    [x, z, -y],
    [-x, -y, z],
    [-x, -z, -y],
    [-x, y, -z],
    [-x, z, y],
    [-z, x, -y],
    [y, x, -z],
    [z, x, y],
    [-y, x, z],
    [z, -x, -y],
    [y, -x, z],
    [-z, -x, y],
    [-y, -x, -z],
    [-y, -z, x],
    [z, -y, x],
    [y, z, x],
    [-z, y, x],
    [z, y, -x],
    [-y, z, -x],
    [-z, -y, -x],
    [y, -z, -x],
  ];
};

const iterateBeaconOffset = (beacons, callable = (beacons = [], oX = 0, oY = 0, oZ = 0) => {}) => {
  for (let i = 0; i < beacons.length; i++) {
    const [rX, rY, rZ] = beacons[i];
    const offsetBeacons = beacons.map(([x, y, z]) => [x - rX, y - rY, z - rZ]);
    const result = callable(offsetBeacons, rX, rY, rZ);

    if (result) return { beacons: offsetBeacons, offset: [rX, rY, rZ] };
  }

  return false;
};

// Map raw scanner input
let scannerKey = null;
Utils.Input.strToLines(Utils.Input.getInput()).forEach((line) => {
  if (line !== '') {
    if (line.includes('scanner')) {
      scannerKey = line;
      scanners[scannerKey] = { key: scannerKey, beacons: {} };
    } else {
      let [x, y, z] = line.split(',');

      x = parseInt(x, 10);
      y = parseInt(y, 10);
      z = parseInt(z, 10);

      const rotations = getRotations(x, y, z);

      rotations.forEach((rotation, i) => {
        if (!(i in scanners[scannerKey].beacons)) scanners[scannerKey].beacons[i] = [];
        scanners[scannerKey].beacons[i].push(rotation);
      });
    }
  }
});

const scannerPositions = { '--- scanner 0 ---': [0, 0, 0] };
const compositeBeacons = [...scanners['--- scanner 0 ---'].beacons[0]];
let remaining = Object.values(scanners).filter((obj) => obj.key !== '--- scanner 0 ---');
const beaconMap = new Set([...compositeBeacons].map((beacon) => toStr.apply(null, beacon)));
let iterations = 0;

while (remaining.length > 0 && ++iterations < Object.keys(scanners).length) {
  iterateBeaconOffset(compositeBeacons, (offsetBeacons, oX, oY, oZ) => {
    const offsetBeaconStrs = offsetBeacons.map(([x, y, z]) => toStr(x, y, z));

    remaining.forEach((scannerResult) => {
      Object.values(scannerResult.beacons).some((rotatedBeacons, rotation) => {
        const result = iterateBeaconOffset(rotatedBeacons, (curOffsetBeacons, cX, cY, cZ) => {
          const curOffsetBeaconStrs = curOffsetBeacons.map(([x, y, z]) => toStr(x, y, z));
          const matching = Utils.Array.intersects(offsetBeaconStrs, curOffsetBeaconStrs);

          return matching.length >= 12;
        });

        if (result) {
          const {
            offset: [cX, cY, cZ],
          } = result;
          const scannerX = oX - cX;
          const scannerY = oY - cY;
          const scannerZ = oZ - cZ;
          scannerPositions[scannerResult.key] = [scannerX, scannerY, scannerZ];

          rotatedBeacons.forEach(([x, y, z]) => {
            const newX = x + scannerX;
            const newY = y + scannerY;
            const newZ = z + scannerZ;

            if (!beaconMap.has(toStr(newX, newY, newZ))) {
              beaconMap.add(toStr(x + scannerX, y + scannerY, z + scannerZ));
              compositeBeacons.push([newX, newY, newZ]);
            }
          });

          Utils.Output.outDebug(
            `Scanner ${scannerResult.key} relative position is ${toStr(scannerX, scannerY, scannerZ)}`,
          );
          Utils.Output.outDebug(`Remaining count = ${remaining.length}`);

          remaining = Object.values(scanners).filter((obj) => !Object.keys(scannerPositions).includes(obj.key));

          return true;
        }

        return false;
      });
    });
  });
}

let result = 0;

Object.values(scannerPositions).forEach((scannerA, i) => {
  const [aX, aY, aZ] = scannerA;

  Object.values(scannerPositions).forEach((scannerB, j) => {
    const [bX, bY, bZ] = scannerB;

    const manhattan = aX - bX + aY - bY + aZ - bZ;

    if (manhattan > result) result = manhattan;
  });
});

Utils.Output.outResult(`Part one: ${beaconMap.size}`);
Utils.Output.outResult(`Part two: ${result}`);
