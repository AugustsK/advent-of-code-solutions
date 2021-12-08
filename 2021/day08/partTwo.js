const { getInput, strToLines, lineToArr, lineToIntArr } = require('../../utils/input');
const { arrDiff, arrIntersects, countInstances } = require('../../utils/array');
const { outResult, outDebug } = require('../../utils/output');

const lines = strToLines(getInput()).map(line => line.split(' | '));
let result = 0;

const convertDigit = (digitStr, defaultVariants) => {
    let variants = [...defaultVariants].filter(obj => obj.v.length === digitStr.length);

    for (let i = 0; i < digitStr.length; i++) {
        variants = variants.filter(obj => obj.v.includes(digitStr[i]));
    }

    return variants[0].i;
}

const findUniqueDigits = rawDigits => {
    const uniqueCombinations = [];

    rawDigits.forEach(digit => {
        if (uniqueCombinations.length === 0) uniqueCombinations.push(digit);
        else {
            let allMatch = false;
            let lengthMatch = uniqueCombinations.filter(uDigit => uDigit.length === digit.length);

            if (lengthMatch.length) {
                lengthMatch.some(uDigit => {
                    allMatch = true;

                    for (let i = 0; i< uDigit.length; i++) {
                        if (!digit.includes(uDigit[i])) allMatch = false;
                    }

                    return allMatch;
                })
            }

            if (!allMatch) {
                uniqueCombinations.push(digit);
            }
        }
    });

    return uniqueCombinations;
}

const mapDigitsToBits = uid => {
    const rawDigits = uid.split(' ');
    const uniqueCombinations = findUniqueDigits(rawDigits);

    const one = rawDigits.filter(digit => digit.length === 2);
    const four = rawDigits.filter(digit => digit.length === 4);
    const seven = rawDigits.filter(digit => digit.length === 3);
    const eight = rawDigits.filter(digit => digit.length === 7);

    const finalA = arrDiff(seven[0].split(''), one[0].split(''))[0];
    const [ possibleBD, possibleDB ] = arrDiff(four[0].split(''), seven[0].split(''));
    const finalB = countInstances(uniqueCombinations, possibleBD) === 6 ? possibleBD : possibleDB;
    const finalD = finalB === possibleBD ? possibleDB : possibleBD;
    const [ possibleCF, possibleFC ] = arrIntersects(seven[0].split(''), one[0].split(''));
    const finalC = countInstances(uniqueCombinations, possibleCF) === 8 ? possibleCF : possibleFC;
    const finalF = finalC === possibleCF ? possibleFC : possibleCF;
    const [ possibleEG, possibleGE ] = arrDiff(eight[0].split(''), [finalA, finalB, finalC, finalD, finalF]);
    const finalE = countInstances(uniqueCombinations, possibleEG) === 4 ? possibleEG : possibleGE;
    const finalG = finalE === possibleEG ? possibleGE : possibleEG;

    return {
        a: finalA,
        b: finalB,
        c: finalC,
        d: finalD,
        e: finalE,
        f: finalF,
        g: finalG
    };
}

const bitMapToDigits = bitMap => {
    const { a, b, c, d, e, f, g } = bitMap;

    return [
        { i: 0, v: [a, b, c, e, f, g] },
        { i: 1, v: [c, f] },
        { i: 2, v: [a, c, d, e, g] },
        { i: 3, v: [a, c, d, f, g] },
        { i: 4, v: [b, c, d, f] },
        { i: 5, v: [a, b, d, f, g] },
        { i: 6, v: [a, b, d, e, f, g] },
        { i: 7, v: [a, c, f] },
        { i: 8, v: [a, b, c, d, e, f, g] },
        { i: 9, v: [a, b, c, d, f, g] }
    ]
}

lines.forEach(([uid, numBuffer]) => {
    const numbers = numBuffer.split(' ');
    const bitMap = mapDigitsToBits(uid);
    const possibleDigits = bitMapToDigits(bitMap);
    let value = '';

    numbers.forEach(numberStr => {
        value += convertDigit(numberStr, possibleDigits);
    });

    result += parseInt(value, 10);
});

outResult(result);
