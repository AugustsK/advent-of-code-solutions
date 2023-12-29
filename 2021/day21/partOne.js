const Utils = require('../../utils');

let [playerOnePos, playerTwoPos] = Utils.Input.strToLines(Utils.Input.getInput());
playerOnePos = parseInt(playerOnePos.split(': ')[1], 10);
playerTwoPos = parseInt(playerTwoPos.split(': ')[1], 10);

let _dice = 0;
const rollDice = () => {
  let result = ++_dice % 100;

  return result || 100;
};

let playerOneScore = 0;
let playerTwoScore = 0;
let i = 0;

while (playerOneScore < 1000 && playerTwoScore < 1000) {
  let rolls = 0;

  for (let j = 0; j < 3; j++) rolls += rollDice();

  if (i++ % 2 === 0) {
    playerOnePos = (playerOnePos + rolls) % 10 || 10;
    playerOneScore += playerOnePos;
  } else {
    playerTwoPos = (playerTwoPos + rolls) % 10 || 10;
    playerTwoScore += playerTwoPos;
  }
}

let partOne = Math.min(playerOneScore, playerTwoScore) * _dice;

Utils.Output.outResult(partOne);
