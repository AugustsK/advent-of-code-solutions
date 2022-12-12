const Utils = require('../../utils');

const raw = Utils.Input.strToLines(Utils.Input.getInput());

const monkeys = new Map();
const monkeyItems = new Map();
const monkeyIndexes = new Set();
const monkeyInspectCount = {};

for (let i = 0; i < raw.length; i += 7) {
    const monkey = i / 7;
    const [
        startingItemsRaw,
        operationRaw,
        testRaw,
        testConditionTrueRaw,
        testConditionFalseRaw
    ] = raw.slice(i + 1, i + 7);

    const startingItems = startingItemsRaw
        .trim()
        .replace('Starting items: ', '')
        .split(', ')
        .map(item => parseInt(item, 10));
    const [op, val] = operationRaw.trim().replace('Operation: new = old ', '').split(' ');
    const divisibleBy = parseInt(testRaw.trim().replace('Test: divisible by ', ''), 10);
    const ifTrueThrowTo = parseInt(testConditionTrueRaw.trim().replace('If true: throw to monkey ', ''), 10);
    const ifFalseThrowTo = parseInt(testConditionFalseRaw.trim().replace('If false: throw to monkey ', ''), 10);

    monkeyItems.set(monkey, startingItems);
    monkeyIndexes.add(monkey);
    monkeys.set(monkey, {
        op,
        val: val === 'old' ? 'old' : parseInt(val, 10),
        divisibleBy,
        ifTrueThrowTo,
        ifFalseThrowTo
    });
    monkeyInspectCount[monkey] = 0;
}

const round = () => {
    monkeyIndexes.forEach(monkeyIndex => {
        const monkey = monkeys.get(monkeyIndex);
        const items = monkeyItems.get(monkeyIndex);

        items.forEach(item => {
            monkeyInspectCount[monkeyIndex] += 1;

            let opValue = monkey.val;
            let worry = item;

            if (opValue === 'old') {
                opValue = worry;
            }

            switch (monkey.op) {
                case '*':
                    worry *= opValue;

                    break;
                case '+':
                    worry += opValue;

                    break;
            }

            worry = Math.floor(worry / 3);

            const dividable = worry % monkey.divisibleBy === 0;
            const targetMonkeyIndex = dividable ? monkey.ifTrueThrowTo : monkey.ifFalseThrowTo;
            const targetMonkeyItems = monkeyItems.get(targetMonkeyIndex);

            targetMonkeyItems.push(worry);
            monkeyItems.set(targetMonkeyIndex, targetMonkeyItems);
        });

        monkeyItems.set(monkeyIndex, []);
    });
}

for (let i = 0; i < 20; i++) {
    round();
}

let partOne = Object.values(monkeyInspectCount).sort((a, b) => b - a).slice(0, 2).reduce((acc, cur) => acc * cur, 1);

Utils.Output.outResult(partOne);
