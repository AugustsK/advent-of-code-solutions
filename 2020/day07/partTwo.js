const { getInput, strToLines, lineToArr, lineToIntArr, strToEmptyLineGroups } = require('../../utils/input');
const { arrDiff, arrIntersects } = require('../../utils/array');
const { outResult, outDebug } = require('../../utils/output');

const map = new Map();
strToLines(getInput()).forEach(rule => {
    let [ bag, contain ] = rule.split(' bags contain ');

    if (contain !== 'no other bags.') {
        contain = contain.slice(0, -1).split(', ').map(bagCount => {
            const count = parseInt(bagCount.slice(0, 1), 10);
            let bagType = bagCount.replace(`${count} `, '');

            if (bagType.slice(-1) !== 's') {
                bagType += 's';
            }

            bagType = bagType.replace(' bags', '');

            return {
                count,
                bagType
            }
        });

        map.set(bag, contain);
    }
});

const countBags = bag => {
    const bagSiblings = map.get(bag);

    if (bagSiblings) {
        return bagSiblings.reduce((sum, obj) => {
            return sum + obj.count * countBags(obj.bagType);
        }, 1);
    }

    return 1;
}

outResult(countBags('shiny gold') - 1);
