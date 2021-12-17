const { performance } = require('perf_hooks');
const chalk = require('chalk');
const prettyMs = require('pretty-ms');
const { debugFlag } = require('./input');

const startTime = performance.now();

/**
 * @param {string|number} result
 */
const outResult = (result = '') => {
    const endTime = performance.now();
    console.log(`\n${chalk.green('Result:')} ${result}`);
    console.log(`${chalk.blue('Time to complete')}: ${prettyMs(endTime - startTime)}`);
};

/**
 * @param {*} debug
 */
const outDebug = debug => debugFlag() ? console.log(`${chalk.blue((new Date()).toTimeString())}: ${typeof debug === 'object' ? JSON.stringify(debug, null, 2) : debug}`) : null;

/**
 * @param {string|number} str
 */
const outProgress = str => {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(str);
}

module.exports = {
    outResult,
    outDebug,
    outProgress
}
