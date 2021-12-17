const Utils = require('../../utils');

const startingNumbers = Utils.Input.lineToIntArr(Utils.Input.getInput());
const spokenNumbers = {};
const iterations = 30000000;

for (let turn = 1; turn <= startingNumbers.length; turn++) {
    Utils.Output.outDebug(`Init turn ${turn}: ${startingNumbers[turn - 1]}`);
    spokenNumbers[startingNumbers[turn - 1]] = turn;
}
let prevNumber = startingNumbers[startingNumbers.length - 1];
let curNumber = startingNumbers[startingNumbers.length - 1];
delete spokenNumbers[curNumber];

Utils.Output.outDebug('------------------------------');

for (let turn = startingNumbers.length + 1; turn <= iterations; turn++) {
    Utils.Output.outProgressBar(turn, iterations);
    let prevTurn = turn - 1;

    if (!prevNumber in spokenNumbers || !spokenNumbers[prevNumber]) {
        curNumber = 0;
    }
    else {
        curNumber = prevTurn - spokenNumbers[prevNumber];
    }

    spokenNumbers[prevNumber] = prevTurn;
    prevNumber = curNumber;

    Utils.Output.outDebug(`Turn ${turn}: ${curNumber}`);
}

// TODO: optimize because this shit's taking 4 minutes to run
Utils.Output.outResult(curNumber);
