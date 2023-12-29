import type { Coords } from '../../types';

import { InputUtil, OutputUtil, MathUtil, ArrayUtil } from '../../utils';

type Node = {
  start: Coords;
  end: Coords;
  value: string;
};

const numbers: Node[] = [];
const parts: Node[] = [];

const isDigit = (str?: string) => /\d/.test(str || '');
const isPart = (str?: string) => /[^.]/.test(str || '');

InputUtil.strToLines(InputUtil.getInput()).forEach((line, y) => {
  let node: Partial<Node> = {
    value: '',
  };

  line.split('').forEach((char, x) => {
    const curCoords: Coords = {
      x,
      y,
    };
    if (isDigit(char)) {
      node.value += char;

      if (!isDigit(line[x - 1])) {
        node.start = curCoords;
      }

      if (!isDigit(line[x + 1])) {
        node.end = curCoords;
        numbers.push({
          ...node,
        } as Node);

        node = {
          value: '',
        };
      }
    } else if (isPart(char)) {
      parts.push({
        start: curCoords,
        end: curCoords,
        value: char,
      });
    }
  });
});

const partNumbers = numbers.filter((node) =>
  parts.some(({ start }) => {
    const nodeMinX = node.start.x - 1;
    const nodeMaxX = node.end.x + 1;
    const nodeMinY = node.start.y - 1;
    const nodeMaxY = node.end.y + 1;

    return start.x >= nodeMinX && start.x <= nodeMaxX && start.y >= nodeMinY && start.y <= nodeMaxY;
  }),
);

let gearRatios = 0;

parts
  .filter((part) => part.value === '*')
  .forEach((part) => {
    const numberNodes = partNumbers.filter((number) => {
      const nodeMinX = number.start.x - 1;
      const nodeMaxX = number.end.x + 1;
      const nodeMinY = number.start.y - 1;
      const nodeMaxY = number.end.y + 1;

      return (
        part.start.x >= nodeMinX && part.start.x <= nodeMaxX && part.start.y >= nodeMinY && part.start.y <= nodeMaxY
      );
    });

    if (numberNodes.length === 2) {
      gearRatios += parseInt(numberNodes[0].value, 10) * parseInt(numberNodes[1].value, 10);
    }
  });

const partOne = partNumbers.reduce((sum, cur) => sum + parseInt(cur.value, 10), 0);
const partTwo = gearRatios;

OutputUtil.outResult(partOne);
OutputUtil.outResult(partTwo);
