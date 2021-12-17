const fs = require('fs');

/**
 * @param {string} line
 * @param {string} delimiter
 * @return {*|string[]}
 */
const lineToArr = (line, delimiter = ',') => {
    return line.split(delimiter);
};

/**
 * @param {string} line
 * @param {string} delimiter
 * @return {number[]}
 */
const lineToIntArr = (line, delimiter = ',') => {
    return lineToArr(line, delimiter)
        .filter(str => str !== '')
        .map(str => parseInt(str, 10));
};

/**
 * @param {string} str
 * @returns {string[]}
 */
const strToLines = str => {
    return ('' + str).split(/\r?\n/);
};

/**
 * @param {string} str
 * @returns {string[][]}
 */
const strToEmptyLineGroups = str => {
    return ('' + str).split(/\r?\n\r?\n/).map(strToLines);
};

/**
 * @param {string} path
 * @return {string}
 */
const readFile = path => {
    return fs.readFileSync(path).toString();
};

/**
 * @return {string}
 */
const inputFileArg = () => {
    return process.argv[2];
};

const debugFlag = () => {
    return ['-D', '--debug'].includes(process.argv[3]);
};

/**
 * @returns {string}
 */
const getInput = () => {
    return readFile(inputFileArg());
};

module.exports = {
    lineToArr,
    lineToIntArr,
    strToLines,
    strToEmptyLineGroups,
    getInput,
    debugFlag
}
