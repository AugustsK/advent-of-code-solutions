const { performance } = require('perf_hooks');
const { throttle } = require('lodash');
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
const outDebug = (debug) => {
  if (debugFlag()) {
    const d = new Date();
    const timeStr = `${('' + d.getHours()).padStart(2, '0')}:${('' + d.getMinutes()).padStart(2, '0')}:${(
      '' + d.getSeconds()
    ).padStart(2, '0')}.${('' + d.getMilliseconds()).padStart(3, '0')}`;
    const output = typeof debug === 'object' ? JSON.stringify(debug, null, 2) : debug;

    console.log(`${chalk.blue(timeStr)}: ${output}`);
  }
};
const progress = (cur, length, resolution = 50, filledSymbol = '█', emptySymbol = '.') => {
  if (!debugFlag()) {
    const filled = new Array(Math.floor((resolution / length) * cur)).fill(filledSymbol);
    const empty = new Array(resolution - filled.length).fill(emptySymbol);
    outProgress(`${filled.join('')}${empty.join('')} ${cur} / ${length}`);
  }
};

/**
 * @param {string|number} str
 */
const _outProgress = (str) => {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.stdout.write(str);
};

/**
 * @param {string|number} str
 */
const outProgress = throttle(_outProgress, 1000 / 30, { trailing: true });

module.exports = {
  outResult,
  outDebug,
  outProgress,
  outProgressBar: progress,
};
