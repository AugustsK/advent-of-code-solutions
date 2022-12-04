const Utils = require('../../utils');

const pairs = Utils.Input.strToLines(Utils.Input.getInput())
    .map(line => line.split(',').map(range => range.split('-').map(num => parseInt(num, 10))));

const partOne = pairs.filter(([a, b]) => {
    const [aMin, aMax] = a;
    const [bMin, bMax] = b;
    const aInB = aMin >= bMin && aMax <= bMax;
    const bInA = bMin >= aMin && bMax <= aMax;

    return aInB || bInA;
}).length;

const partTwo = pairs.filter(([a, b]) => {
    const [aMin, aMax] = a;
    const [bMin, bMax] = b;
    const aMinInB = aMin >= bMin && aMin <= bMax;
    const aMaxInB = aMax >= bMin && aMax <= bMax;
    const bMinInA = bMin >= aMin && bMin <= aMax;
    const bMaxInA = bMax >= aMin && bMax <= aMax;

    return aMinInB || aMaxInB || bMinInA || bMaxInA;
}).length;

Utils.Output.outResult(partOne);
Utils.Output.outResult(partTwo);
