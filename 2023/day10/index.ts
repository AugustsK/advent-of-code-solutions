import type { Coords } from '../../types';

import * as fs from 'fs';

import { InputUtil, OutputUtil, MathUtil, ArrayUtil, GridUtil } from '../../utils';

enum GroundMap {
  vertical = '|',
  horizontal = '-',
  topRight = '7',
  topLeft = 'F',
  bottomLeft = 'L',
  bottomRight = 'J',
  starting = 'S',
  empty = '.',
}

const getSideCoords = (coords: Coords) => ({
  top: {
    x: coords.x,
    y: coords.y - 1,
  },
  right: {
    x: coords.x + 1,
    y: coords.y,
  },
  bottom: {
    x: coords.x,
    y: coords.y + 1,
  },
  left: {
    x: coords.x - 1,
    y: coords.y,
  },
});

const nodes2Symbol = (nodes: Coords[], base: Coords) => {
  const [a, b] = nodes;
  const aStr = GridUtil.coords2str(a);
  const bStr = GridUtil.coords2str(b);
  const { top, right, bottom, left } = getSideCoords(base);
  const topStr = GridUtil.coords2str(top);
  const rightStr = GridUtil.coords2str(right);
  const bottomStr = GridUtil.coords2str(bottom);
  const leftStr = GridUtil.coords2str(left);

  if (aStr === topStr && bStr === bottomStr) return GroundMap.vertical;
  if (aStr === rightStr && bStr === leftStr) return GroundMap.horizontal;
  if (aStr === rightStr && bStr === bottomStr) return GroundMap.topLeft;
  if (aStr === leftStr && bStr === bottomStr) return GroundMap.topRight;
  if (aStr === leftStr && bStr === topStr) return GroundMap.bottomRight;
  if (aStr === rightStr && bStr === topStr) return GroundMap.bottomLeft;

  return undefined;
};

const getAdjacentNodes = (pipe: GroundMap, coords: Coords): Coords[] => {
  const { top, right, bottom, left } = getSideCoords(coords);

  switch (pipe) {
    case GroundMap.empty:
      return [];
    case GroundMap.starting:
      return [top, right, bottom, left];
    case GroundMap.vertical:
      return [top, bottom];
    case GroundMap.horizontal:
      return [right, left];
    case GroundMap.topLeft:
      return [right, bottom];
    case GroundMap.topRight:
      return [left, bottom];
    case GroundMap.bottomRight:
      return [left, top];
    case GroundMap.bottomLeft:
      return [right, top];
  }
};

const getAdjacentNodesFromGrid = (coords: Coords): Coords[] => {
  const pipe = grid.get(GridUtil.coords2str(coords));

  if (!pipe) return [];

  return getAdjacentNodes(pipe, coords);
};

const grid = new Map<string, GroundMap>();
let startingCoords: Coords;
let maxX = 0;
let maxY = 0;

InputUtil.strToLines(InputUtil.getInput()).forEach((line, y, yArr) => {
  maxY = yArr.length - 1;

  line.split('').forEach((char, x, xArr) => {
    maxX = xArr.length - 1;

    if (Object.values(GroundMap).includes(char)) {
      grid.set(GridUtil.coords2str({ x, y }), char as GroundMap);

      if (char === GroundMap.starting) {
        startingCoords = { x, y };
      }
    }
  });
});

const potentialNodes = getAdjacentNodesFromGrid(startingCoords);

let currentNode = potentialNodes.find((node) => {
  const adjacent = getAdjacentNodesFromGrid(node);

  return adjacent.some((adjacentNode) => GridUtil.coords2str(adjacentNode) === GridUtil.coords2str(startingCoords));
});

const ring = [GridUtil.coords2str(startingCoords), GridUtil.coords2str(currentNode)];

while (GridUtil.coords2str(currentNode) !== GridUtil.coords2str(startingCoords)) {
  const adjacent = getAdjacentNodesFromGrid(currentNode);
  const next = adjacent.find((node) => GridUtil.coords2str(node) !== ring[ring.length - 2]);
  currentNode = next;

  if (GridUtil.coords2str(next) !== GridUtil.coords2str(startingCoords)) {
    ring.push(GridUtil.coords2str(next));
  }
}

const first = ring[1];
const last = ArrayUtil.last(ring);

const startingSymbol =
  nodes2Symbol([GridUtil.str2coords(first), GridUtil.str2coords(last)], startingCoords) ||
  nodes2Symbol([GridUtil.str2coords(last), GridUtil.str2coords(first)], startingCoords);

grid.set(GridUtil.coords2str(startingCoords), startingSymbol);

let partOne = Math.floor(ring.length / 2);

const inner: string[] = [];

for (let y = 0; y <= maxY; y++) {
  let previousCorner: GroundMap;
  let isInner = false;

  for (let x = 0; x <= maxX; x++) {
    const coordStr = GridUtil.coords2str({ x, y });
    const isRing = ring.indexOf(coordStr) > -1;

    if (isRing) {
      const symbol = grid.get(coordStr);

      switch (symbol) {
        case GroundMap.vertical:
          isInner = !isInner;
          break;
        case GroundMap.topRight:
          if (previousCorner === GroundMap.bottomLeft) {
            isInner = !isInner;
          }
          previousCorner = symbol;
          break;
        case GroundMap.bottomRight:
          if (previousCorner === GroundMap.topLeft) {
            isInner = !isInner;
          }
          previousCorner = symbol;
          break;
        case GroundMap.topLeft:
        case GroundMap.bottomLeft:
          previousCorner = symbol;
          break;
      }
    } else if (isInner) {
      inner.push(coordStr);
    }
  }
}

let output = '';

for (let y = 0; y <= maxY; y++) {
  for (let x = 0; x <= maxX; x++) {
    const coordStr = GridUtil.coords2str({ x, y });
    const isLine = ring.indexOf(coordStr) > -1;

    if (isLine) {
      const direction = grid.get(coordStr);

      switch (direction) {
        case GroundMap.starting:
          output += '╬';
          break;
        case GroundMap.vertical:
          output += '║';
          break;
        case GroundMap.horizontal:
          output += '═';
          break;
        case GroundMap.topLeft:
          output += '╔';
          break;
        case GroundMap.topRight:
          output += '╗';
          break;
        case GroundMap.bottomRight:
          output += '╝';
          break;
        case GroundMap.bottomLeft:
          output += '╚';
          break;
      }
    } else {
      const isInner = inner.find((item) => item === coordStr);

      if (isInner) {
        output += '░';
      } else {
        output += ' ';
      }
    }
  }
  output += '\n';
}

fs.writeFileSync('grid.txt', output);

let partTwo = inner.length;

OutputUtil.outResult(partOne);
OutputUtil.outResult(partTwo);
