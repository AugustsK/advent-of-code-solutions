const Utils = require('../../utils');

const startingNumbers = Utils.Input.lineToIntArr(Utils.Input.getInput());
const spokenNumbers = {};

for (let turn = 1; turn <= startingNumbers.length; turn++) {
  Utils.Output.outDebug(`Turn ${turn}:`);
  Utils.Output.outDebug(`Saying out loud ${startingNumbers[turn - 1]}`);
  Utils.Output.outDebug('------------------------------');
  spokenNumbers[startingNumbers[turn - 1]] = turn;
}
let prevNumber = startingNumbers[startingNumbers.length - 1];
let curNumber = startingNumbers[startingNumbers.length - 1];
delete spokenNumbers[curNumber];

for (let turn = startingNumbers.length + 1; turn <= 2020; turn++) {
  let prevTurn = turn - 1;

  Utils.Output.outDebug(`Turn ${turn}:`);

  if ((!prevNumber) in spokenNumbers || !spokenNumbers[prevNumber]) {
    curNumber = 0;
    Utils.Output.outDebug(`Previous number ${prevNumber} spoken for first time`);
  } else {
    Utils.Output.outDebug(`Previous number ${prevNumber} was spoken on ${spokenNumbers[prevNumber]}`);
    curNumber = prevTurn - spokenNumbers[prevNumber];
  }

  spokenNumbers[prevNumber] = prevTurn;
  prevNumber = curNumber;

  Utils.Output.outDebug('------------------------------');
}

Utils.Output.outResult(curNumber);
