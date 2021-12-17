const { getInput, strToLines, lineToArr, lineToIntArr, strToEmptyLineGroups, debugFlag } = require('./input');
const { arrIntersects, arrDiff, countInstances, sort } = require('./array');
const { lcm, gcd, gauss } = require('./math');
const { outResult, outDebug, outProgress, outProgressBar } = require('./output');

module.exports = {
    Input: {
        debugEnabled: debugFlag,
        getInput,
        strToLines,
        lineToArr,
        lineToIntArr,
        strToEmptyLineGroups
    },
    Array: {
        intersects: arrIntersects,
        diff: arrDiff,
        count: countInstances,
        sort
    },
    Math: {
        lcm,
        gcd,
        gauss
    },
    Output: {
        outResult,
        outDebug,
        outProgress,
        outProgressBar
    }
};
