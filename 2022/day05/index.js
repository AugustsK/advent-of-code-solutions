const Utils = require('../../utils');

const stacks = new Map();
const stacks9001 = new Map();
const instructions = [];

Utils.Input.strToLines(Utils.Input.getInput()).forEach(line => {
    if (line.startsWith('m')) {
        const [ , count, from, to ] = /^move\s(\d+)\sfrom\s(\d+)\sto\s(\d+)$/.exec(line);

        instructions.push({
            count: parseInt(count, 10),
            from: parseInt(from, 10),
            to: parseInt(to, 10)
        });
    } else if (line.length >= 1) {
        for (let i = 1; i < line.length; i += 4) {
            const stackKey = Math.floor(i / 4) + i % 4;
            const stack = stacks.has(stackKey) ? stacks.get(stackKey) : [];

            if (/[a-zA-Z]/.test(line[i])) {
                stack.push(line[i]);
            }

            stacks.set(stackKey, stack);
            stacks9001.set(stackKey, stack);
        }
    }
});

instructions.forEach(({ count, from, to}) => {
    const stackFrom = stacks.get(from);
    const stackTo = stacks.get(to);
    const toMove = stackFrom.slice(0, count);

    stacks.set(from, stackFrom.slice(count));
    stacks.set(to, [...toMove.reverse(), ...stackTo]);
});

const partOne = [...stacks.values()].reduce((message, stack) => message += stack.shift(), '');

instructions.forEach(({ count, from, to}) => {
    const stackFrom = stacks9001.get(from);
    const stackTo = stacks9001.get(to);
    const toMove = stackFrom.slice(0, count);

    stacks9001.set(from, stackFrom.slice(count));
    stacks9001.set(to, [...toMove, ...stackTo]);
});

const partTwo = [...stacks9001.values()].reduce((message, stack) => message += stack.shift(), '');

Utils.Output.outResult(partOne);
Utils.Output.outResult(partTwo);
