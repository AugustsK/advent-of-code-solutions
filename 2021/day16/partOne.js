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
let binaryLengthToFulfil = null;
let packetCntToFulfil = null;
let result = 0;

const binaryPop = length => {
    let slice = binary.slice(0, length);
    binary = binary.slice(length);

    return slice;
}

while (binary.length) {
    const version = parseInt(binaryPop(3), 2);
    const typeId = parseInt(binaryPop(3), 2);
    result += version;

    if (typeId === 4) { // literal value
        let isLastGroup = false;
        let num = '';

        while (!isLastGroup) {
            let startsWith = binaryPop(1);
            num += binaryPop(4);
            isLastGroup = startsWith === '0';
        }
    } else { // operator
        const typeIdLength = binaryPop(1);
        if (typeIdLength === '0') {
            binaryLengthToFulfil = parseInt(binaryPop(15), 2);
        } else {
            packetCntToFulfil = parseInt(binaryPop(11), 2);
        }
    }

    if (!binary.includes('1')) break;
}

outResult(result);
