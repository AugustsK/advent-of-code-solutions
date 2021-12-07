const { getInput, strToLines, lineToArr, lineToIntArr } = require('../utils/input');
const { outResult, outDebug } = require('../utils/output');

let fishes = lineToIntArr(getInput());
let buffer = [];

fishes.forEach(num => {
    buffer.push({
        total: 1,
        counter: num
    });
});

for (let i = 1; i <= 256; i++) {
    buffer = buffer.map(obj => {
        obj.counter -= 1;

        return obj;
    });

    let expired = buffer.filter(obj => obj.counter < 0);
    buffer = buffer.filter(obj => obj.counter >= 0);

    if (expired.length) {
        let index = buffer.findIndex(obj => obj.counter === 6);

        expired.forEach(obj => {
            if (index > -1) {
                buffer[index].total += obj.total;
            } else {
                buffer.push({
                    counter: 6,
                    total: obj.total
                });
            }

            buffer.push({
                counter: 8,
                total: obj.total
            });
        });
    }
}

let total = 0;
buffer.forEach(obj => total += obj.total);

outResult(total);
