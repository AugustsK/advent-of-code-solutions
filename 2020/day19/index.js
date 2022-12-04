const Utils = require('../../utils');

const startsWithChar = str => /^[a-zA-Z]/.test(str);
const startsWithDigit = str => /^\d/.test(str);

const messages = [];

const unresolvedRules = new Map();
const resolvedRules = new Map();
const rawRules = new Map();

Utils.Input.strToLines(Utils.Input.getInput()).forEach(line => {
    if (startsWithChar(line)) {
        messages.push(line);
    } else if (startsWithDigit(line)) {
        const [ ruleId, rule ] = line.split(': ');

        if (rule.startsWith('"')) {
            resolvedRules.set(ruleId, [rule.replace(/"/g, '')]);
        } else {
            unresolvedRules.set(ruleId, rule.split(' | '));
        }

        rawRules.set(ruleId, rule);
    }
});

while (unresolvedRules.size) {
    const resolvedIds = [];

    unresolvedRules.forEach((rule, ruleId) => {
        let allMatched = true;

        const newRule = rule.map(ruleVariant => {
            return ruleVariant.split(' ').reduce((accumulated, ruleOrChar) => {
                let returnArr = [ruleOrChar];

                if (resolvedRules.has(ruleOrChar)) {
                    returnArr = [resolvedRules.get(ruleOrChar)].flat();
                } else {
                    allMatched = false;
                }

                return accumulated.map(item => returnArr.map(str => [item, str].filter(item => !!item).join(' '))).flat()
            }, [null])
        }).flat();

        if (allMatched) {
            resolvedRules.set(ruleId, newRule);
            resolvedIds.push(ruleId);
        }
    });

    resolvedIds.forEach(id => unresolvedRules.delete(id));
}

resolvedRules.forEach((rule, ruleId) => {
    resolvedRules.set(ruleId, rule.map(ruleEntry => ruleEntry.replace(/\s/g, '')));
});

const rules = resolvedRules.get('0');

let partOne = messages.filter(message => rules.some(rule => rule === message)).length;
let partTwo = 0;

Utils.Output.outResult(partOne);
Utils.Output.outResult(partTwo);
