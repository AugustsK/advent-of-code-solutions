const { performance } = require('perf_hooks');
const chalk = require('chalk');
const prettyMs = require('pretty-ms');
const cliProgress = require('cli-progress');

const startTime = performance.now();

const outResult = result => {
    const endTime = performance.now();
    console.log(`\n${chalk.green('Result:')} ${result}`);
    console.log(`${chalk.blue('Time to complete')}: ${prettyMs(endTime - startTime)}`);
};

const outDebug = debug => console.log(`${chalk.blue((new Date()).toTimeString())}: ${typeof debug === 'object' ? JSON.stringify(debug, null, 2) : debug}`);

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
