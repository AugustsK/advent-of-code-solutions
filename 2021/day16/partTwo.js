const { getInput, strToLines, lineToArr, lineToIntArr, strToEmptyLineGroups } = require('../../utils/input');
const { arrIntersects, arrDiff, countInstances, sort } = require('../../utils/array');
const { outResult, outDebug, outProgress } = require('../../utils/output');

const getBinaryInput = () => {
    let str = getInput();
    let result = '';

    while (str.length) {
        result += parseInt(str.slice(0, 1), 16).toString(2).padStart(4, '0');
        str = str.slice(1);
    }

    return result;
}

let binary = getBinaryInput();

const calcValue = (typeId = 0, values = []) => {
    switch (typeId) {
        case 0: return values.reduce((sum, x) => sum + x);
        case 1: return values.reduce((sum, x) => sum * x);
        case 2: return Math.min(...values);
        case 3: return Math.max(...values);
        case 5: return (values[0] > values[1]) ? 1 : 0;
        case 6: return (values[0] < values[1]) ? 1 : 0;
        case 7: return (values[0] === values[1]) ? 1 : 0;
    }

    return 0;
}

const binaryPop = length => {
    const slice = binary.slice(0, length);
    binary = binary.slice(length);

    return slice;
}

let versionResult = 0;

const decode = () => {
    const version = parseInt(binaryPop(3), 2);
    const typeId = parseInt(binaryPop(3), 2);

    versionResult += version;

    if (typeId === 4) { // literal value
        let isLastGroup = false;
        let num = '';

        while (!isLastGroup) {
            const startsWith = binaryPop(1);
            num += binaryPop(4);
            isLastGroup = startsWith === '0';
        }

        return parseInt(num, 2);
    } else { // operator
        const typeIdLength = binaryPop(1);
        const values = [];

        if (typeIdLength === '0') {
            let remaining = parseInt(binaryPop(15), 2);

            while (remaining > 0) {
                const curSize = binary.length;

                values.push(decode());
                remaining -= curSize - binary.length;
            }
        } else {
            const length = parseInt(binaryPop(11), 2);
            for (let i = 0; i < length; i++) values.push(decode());
        }

        return calcValue(typeId, values);
    }
}

let result = decode();

outDebug(`Part one: ${versionResult}`);
outResult(result);
