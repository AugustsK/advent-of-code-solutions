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

let multibar;

const createProgress = size => {
    if (!multibar) {
        multibar = new cliProgress.MultiBar({
            clearOnComplete: false,
            hideCursor: true

        }, cliProgress.Presets.shades_grey);
    }

    return multibar.create(size, 0);
}

module.exports = {
    outResult,
    outDebug,
    createProgress
}
