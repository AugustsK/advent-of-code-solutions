const Utils = require('../../utils');

let activeGrid = new Set();

const toStr = (...coords) => coords.join(':');

const toCoords = (str) => str.split(':').map((x) => parseInt(x, 10));

const getActiveNeighbourCnt = (coords = []) => {
  const [sX, sY, sZ] = coords;
  const inactiveToCheck = new Set();
  let activeNeighbourCnt = 0;

  for (let x = sX - 1; x <= sX + 1; x++) {
    for (let y = sY - 1; y <= sY + 1; y++) {
      for (let z = sZ - 1; z <= sZ + 1; z++) {
        if (x !== sX || y !== sY || z !== sZ) {
          if (activeGrid.has(toStr(x, y, z))) {
            activeNeighbourCnt++;
          } else {
            inactiveToCheck.add(toStr(x, y, z));
          }
        }
      }
    }
  }

  return {
    cnt: activeNeighbourCnt,
    inActives: inactiveToCheck,
  };
};

const iterate = () => {
  const activeGridArr = Array.from(activeGrid);
  const newGrid = new Set();

  activeGridArr.forEach((coordStr) => {
    const coords = toCoords(coordStr);
    const { cnt: activeNeighbours, inActives } = getActiveNeighbourCnt(coords);

    if (activeNeighbours >= 2 && activeNeighbours <= 3) newGrid.add(coordStr);

    Array.from(inActives).forEach((inActiveStr) => {
      const inActiveCoords = toCoords(inActiveStr);
      const { cnt } = getActiveNeighbourCnt(inActiveCoords);

      if (cnt === 3) newGrid.add(inActiveStr);
    });
  });

  return newGrid;
};

const draw = (cycle = 0) => {
  if (!Utils.Input.debugEnabled()) return null;

  Utils.Output.outDebug(cycle > 0 ? `After ${cycle} cycle${cycle === 1 ? '' : 's'}:` : 'Before any cycles:');
  console.log('');

  const xEs = [];
  const yEs = [];
  const zEs = [];

  Array.from(activeGrid).forEach((str) => {
    const [x, y, z] = toCoords(str);

    xEs.push(x);
    yEs.push(y);
    zEs.push(z);
  });

  const minX = Math.min(...xEs);
  const maxX = Math.max(...xEs);
  const minY = Math.min(...yEs);
  const maxY = Math.max(...yEs);
  const minZ = Math.min(...zEs);
  const maxZ = Math.max(...zEs);

  for (let z = minZ; z <= maxZ; z++) {
    Utils.Output.outDebug(`z=${z}`);

    for (let y = minY; y <= maxY; y++) {
      let line = '';

      for (let x = minX; x <= maxX; x++) {
        line += activeGrid.has(toStr(x, y, z)) ? '#' : '.';
      }

      Utils.Output.outDebug(line);
    }

    console.log('');
  }

  console.log('');
};

// Map initial state
Utils.Input.strToLines(Utils.Input.getInput()).forEach((line, y) => {
  line.split('').forEach((state, x) => {
    if (state === '#') activeGrid.add(toStr(x, y, 0));
  });
});

draw();

// Iterations
for (let step = 1; step <= 6; step++) {
  activeGrid = iterate();
  draw(step);
}

Utils.Output.outDebug(Array.from(activeGrid));
Utils.Output.outResult(activeGrid.size);
