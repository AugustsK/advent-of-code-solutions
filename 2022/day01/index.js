const Utils = require('../../utils');
const { sort } = require('../../utils/array');

const elves = Utils.Input.getInput()
  .split(/\n\n/)
  .map((elve) =>
    elve
      .split(/\n/)
      .filter((calories) => !!calories)
      .map((calories) => parseInt(calories, 10))
      .reduce((previousValue, currentValue) => previousValue + currentValue, 0),
  );

const sortedElves = [...elves].sort((a, b) => b - a);

let partOne = sortedElves[0];
let partTwo = sortedElves.slice(0, 3).reduce((previousValue, currentValue) => previousValue + currentValue, 0);

Utils.Output.outResult(partOne);
Utils.Output.outResult(partTwo);
