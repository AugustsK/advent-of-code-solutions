const fs = require('fs');

const lineToArr = (line, delimiter = ',') => line.split(delimiter);

const lineToIntArr = (line, delimiter = ',') =>
    lineToArr(line, delimiter)
        .filter(str => str !== '')
        .map(str => parseInt(str, 10));

const strToLines = str => ('' + str).split(/\r?\n/);

const strToEmptyLineGroups = str => ('' + str).split(/\r?\n\r?\n/).map(strToLines);

const readFile = path => fs.readFileSync(path).toString();

const inputFileArg = () => process.argv[2];

const getInput = () => readFile(inputFileArg());

module.exports = {
    lineToArr,
    lineToIntArr,
    strToLines,
    strToEmptyLineGroups,
    getInput
}
