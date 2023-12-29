import type { Coords } from '../../types';

import { InputUtil, OutputUtil, MathUtil, ArrayUtil } from '../../utils';

const getNums = (str: string) =>
  str
    .split(' ')
    .map((str) => str.trim())
    .filter((str) => !!str)
    .map((str) => parseInt(str, 10));

const games = InputUtil.strToLines(InputUtil.getInput()).map((line) => {
  const [, gameStr] = line.split(': ');
  const [winningStr, cardStr] = gameStr.split(' | ');

  const winning = getNums(winningStr);
  const card = getNums(cardStr);

  return {
    winning,
    card,
  };
});

const points = games.map(({ winning, card }) =>
  card.reduce((points, num) => {
    const isWinning = winning.some((wNum) => wNum === num);

    if (isWinning) {
      if (points === 0) {
        return 1;
      }

      return points * 2;
    }

    return points;
  }, 0),
);

let partOne = points.reduce((sum, cur) => sum + cur, 0);

const parsedGames = games.map((game) => ({
  ...game,
  count: 1,
}));

parsedGames.forEach(({ winning, card, count }, idx) => {
  const matches = card.filter((num) => winning.some((wNum) => wNum === num)).length;

  for (let i = 1; i <= matches; i++) {
    parsedGames[idx + i].count += count;
  }
});

let partTwo = parsedGames.reduce((sum, cur) => sum + cur.count, 0);

OutputUtil.outResult(partOne);
OutputUtil.outResult(partTwo);
