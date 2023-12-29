import { InputUtil, OutputUtil, MathUtil, ArrayUtil } from '../../utils';

type Game = {
  red?: number;
  green?: number;
  blue?: number;
};

const games = InputUtil.strToLines(InputUtil.getInput()).map((line) => {
  const [gameIdRaw, gameRaw] = line.split(': ');
  const [, gameIdStr] = gameIdRaw.split(' ');
  const gameId = parseInt(gameIdStr, 10);

  const cubeSets = gameRaw.split('; ').map(
    (set) =>
      Object.fromEntries(
        new Map(
          set.split(', ').map((cubes) =>
            cubes
              .split(' ')
              .reverse()
              .map((val) => (/\d/.test(val) ? parseInt(val, 10) : val)),
          ),
        ),
      ) as Game,
  );

  return [gameId, cubeSets];
});

const bag = {
  red: 12,
  green: 13,
  blue: 14,
} satisfies Game;

const validGames = games.filter((game) =>
  game[1].every((set) => Object.keys(set).every((key) => bag[key] >= set[key])),
);

const partOne = validGames.reduce((sum, game) => sum + game[0], 0);

const powers = games.map(([, gameSets]) => {
  const minBag = gameSets.reduce((bag, cur) => {
    const result = {
      ...bag,
    };

    Object.keys(cur).forEach((key) => {
      if ((result[key] || 0) < cur[key]) {
        result[key] = cur[key];
      }
    });

    return result;
  }, {} as Game);

  return Object.values(minBag).reduce((pow, cur) => pow * cur, 1);
});

const partTwo = powers.reduce((sum, cur) => sum + cur, 0);

OutputUtil.outResult(partOne);
OutputUtil.outResult(partTwo);
