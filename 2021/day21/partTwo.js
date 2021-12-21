const Utils = require('../../utils');

// Read input from txt
let [ playerOneInitPos, playerTwoInitPos ] = Utils.Input.strToLines(Utils.Input.getInput());
playerOneInitPos = parseInt(playerOneInitPos.split(': ')[1], 10);
playerTwoInitPos = parseInt(playerTwoInitPos.split(': ')[1], 10);

// Map possible combinations for Dirac Dice
const combinations = {};

for (let i = 1; i <= 3; i++) {
    for (let j = 1; j <= 3; j++) {
        for (let k = 1; k <= 3; k++) {
            const result = i + j + k;

            if (result in combinations) combinations[result] += 1;
            else combinations[result] = 1;
        }
    }
}

// Memoized simulations
const _c = new Map();
const simulate = (startX, startY, scoreX = 0, scoreY = 0, i = 0) => {
    const key = [startX, startY, scoreX, scoreY, i].join(':');
    const existing = _c.get(key);

    // If we have score for this set of inputs, return that
    if (existing) return existing;

    let playerOnePos = startX;
    let playerTwoPos = startY;
    let playerOneScore = scoreX;
    let playerTwoScore = scoreY;

    if (playerOneScore >= 21) {
        _c.set(key, [1, 0]);

        return [1, 0];
    } else if (playerTwoScore >= 21) {
        _c.set(key, [0, 1]);

        return [0, 1];
    } else {
        let result = [ 0, 0 ];

        for (let [ diceRoll, freq ] of Object.entries(combinations)) {
            diceRoll = parseInt(diceRoll, 10);

            // Player 1 === even (i starts at 0)
            if (i % 2 === 0) {
                playerOnePos = (startX + diceRoll) % 10 || 10;
                playerOneScore = scoreX + playerOnePos;
            } else {
                playerTwoPos = (startY + diceRoll) % 10 || 10;
                playerTwoScore = scoreY + playerTwoPos;
            }

            let [ playerOneWins, playerTwoWins ] = simulate(playerOnePos, playerTwoPos, playerOneScore, playerTwoScore, i + 1);
            result = [ result[0] + playerOneWins * freq, result[1] + playerTwoWins * freq ];
        }

        _c.set(key, result);

        return result;
    }
}

// Get wins
const [ playerOneWins, playerTwoWins ] = simulate(playerOneInitPos, playerTwoInitPos);

// TODO: This is still wrong and I don't know why, send help pls
Utils.Output.outResult(Math.max(playerOneWins, playerTwoWins));
