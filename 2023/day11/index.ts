import type { Coords } from '../../types';

import { InputUtil, OutputUtil, MathUtil, ArrayUtil, GridUtil } from '../../utils';

const galaxies = new Map<string, Coords>();
let maxX: number;
let maxY: number;

InputUtil.strToLines(InputUtil.getInput()).forEach((line, y, allY) => {
  if (!maxY) maxY = allY.length - 1;

  line.split('').forEach((point, x, allX) => {
    if (!maxX) maxX = allX.length - 1;

    if (point === '#') {
      const coords = { x, y };
      galaxies.set(GridUtil.coords2str(coords), coords);
    }
  });
});

const galaxyArr = [...galaxies.values()];

const missingX = ArrayUtil.arrDiff(
  Array.from({ length: maxX + 1 })
    .fill(null)
    .map((_, idx) => idx),
  [...new Set(galaxyArr.map((coords) => coords.x)).values()],
);

const missingY = ArrayUtil.arrDiff(
  Array.from({ length: maxY + 1 })
    .fill(null)
    .map((_, idx) => idx),
  [...new Set(galaxyArr.map((coords) => coords.y)).values()],
);

const calculate = (modifier: number) => {
  const expanded = new Map<string, Coords>();

  galaxies.forEach((coords) => {
    const xOffset = missingX.findLastIndex((x) => coords.x > x) + 1;
    const yOffset = missingY.findLastIndex((y) => coords.y > y) + 1;
    const x = coords.x + xOffset * Math.max(modifier - 1, 1);
    const y = coords.y + yOffset * Math.max(modifier - 1, 1);

    expanded.set(GridUtil.coords2str({ x, y }), { x, y });
  });

  const _processed = new Set<string>();
  const pairs = new Map<[string, string], number>();

  expanded.forEach((coords, coordStr) => {
    expanded.forEach((pairCoords, pairCoordStr) => {
      if (_processed.has(pairCoordStr) || coordStr === pairCoordStr) {
        return;
      }

      const xDiff = Math.abs(coords.x - pairCoords.x);
      const yDiff = Math.abs(coords.y - pairCoords.y);
      pairs.set([coordStr, pairCoordStr], xDiff + yDiff);
    });
    _processed.add(coordStr);
  });

  return [...pairs.values()].reduce((sum, cur) => sum + cur, 0);
};

let partOne = calculate(1);
let partTwo = calculate(1000000);

OutputUtil.outResult(partOne);
OutputUtil.outResult(partTwo);
