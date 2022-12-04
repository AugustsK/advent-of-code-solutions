const Utils = require('../../utils');

const ROCK = 'rock';
const PAPER = 'paper';
const SCISSORS = 'scissors';

const WIN = 'win';
const DRAW = 'draw';
const LOOSE = 'loose';

const opponentMoves = new Map([
    ['A', ROCK],
    ['B', PAPER],
    ['C', SCISSORS]
]);

const ownMoves = new Map([
    ['X', ROCK],
    ['Y', PAPER],
    ['Z', SCISSORS]
]);

const points = new Map([
    [ROCK, 1],
    [PAPER, 2],
    [SCISSORS, 3],

    [WIN, 6],
    [DRAW, 3],
    [LOOSE, 0]
]);

const strength = new Map([
    [ROCK, SCISSORS],
    [PAPER, ROCK],
    [SCISSORS, PAPER]
]);

const getHandToWin = loosingHand => {
    const [winningHand] = [...strength.entries()].find(([key, value]) => value === loosingHand);

    return winningHand;
}

const moves = Utils.Input.strToLines(Utils.Input.getInput()).map(line => line.split(' '));

const moveToPointsPart1 = ([ opponent, me]) => {
    const opponentChoice = opponentMoves.get(opponent);
    const myChoice = ownMoves.get(me);
    const isDraw = opponentChoice === myChoice;
    const isWin = strength.get(myChoice) === opponentChoice;
    const choicePoints = points.get(myChoice);
    const resultPoints = isWin ? points.get(WIN) : (isDraw ? points.get(DRAW) : points.get(LOOSE));

    return choicePoints + resultPoints;
}

const partOne = moves.reduce((total, game) => total + moveToPointsPart1(game), 0);

const choiceToMake = new Map([
    ['X', LOOSE],
    ['Y', DRAW],
    ['Z', WIN]
]);

const moveToPointsPart2 = ([ opponent, outcome]) => {
    const opponentChoice = opponentMoves.get(opponent);
    const outcomeConst = choiceToMake.get(outcome);
    const outcomePoints = points.get(outcomeConst);
    const handToPlay = outcomeConst === DRAW ? opponentChoice : (outcomeConst === LOOSE ? strength.get(opponentChoice) : getHandToWin(opponentChoice));
    const handToPoints = points.get(handToPlay);

    return outcomePoints + handToPoints;
}

const partTwo = moves.reduce((total, game) => total + moveToPointsPart2(game), 0);;

Utils.Output.outResult(partOne);
Utils.Output.outResult(partTwo);
