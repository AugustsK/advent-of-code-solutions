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

    const [op, val] = operationRaw.trim().replace('Operation: new = old ', '').split(' ');
    const divisibleBy = parseInt(testRaw.trim().replace('Test: divisible by ', ''), 10);
    const ifTrueThrowTo = parseInt(testConditionTrueRaw.trim().replace('If true: throw to monkey ', ''), 10);
    const ifFalseThrowTo = parseInt(testConditionFalseRaw.trim().replace('If false: throw to monkey ', ''), 10);
    const startingItems = startingItemsRaw
        .trim()
        .replace('Starting items: ', '')
        .split(', ')
        .map(item => ({
            base: parseInt(item, 10),
            value: parseInt(item, 10),
            startingMonkey: monkey
        }));

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

console.log(monkeys);

const round = (roundIndex) => {
    console.log('\n\nROUND INDEX: ', roundIndex, '');
    monkeyIndexes.forEach(monkeyIndex => {
        const monkey = monkeys.get(monkeyIndex);
        const items = monkeyItems.get(monkeyIndex);

        console.log('cur monkey', monkeyIndex, items)

        items.forEach(item => {
            monkeyInspectCount[monkeyIndex] += 1;

            if (item.startingMonkey === monkeyIndex) {
                item.value = item.base;
            }

            let opValue = monkey.val;
            let worry = item.value;

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

            const dividable = worry % monkey.divisibleBy === 0;
            const targetMonkeyIndex = dividable ? monkey.ifTrueThrowTo : monkey.ifFalseThrowTo;
            const targetMonkeyItems = monkeyItems.get(targetMonkeyIndex);

            item.value = worry;
            targetMonkeyItems.push(item);
            monkeyItems.set(targetMonkeyIndex, targetMonkeyItems);
        });

        monkeyItems.set(monkeyIndex, []);
    });
}

for (let i = 0; i < 5; i++) {
    round(i);
}

const logMonkeyItems = () => [...monkeyItems.values()].map(items => items.map(item => ({
    value: item.value,
    visits: [...item.visits.values()].join(', ')
})))

console.log(monkeyInspectCount);

let partOne = Object.values(monkeyInspectCount).sort((a, b) => b - a).slice(0, 2).reduce((acc, cur) => acc * cur, 1);

Utils.Output.outResult(partOne);
