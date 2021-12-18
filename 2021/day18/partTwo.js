const { Worker } = require('worker_threads')
const Utils = require('../../utils');

(async () => {
    const numbers = Utils.Input.strToLines(Utils.Input.getInput());
    const magnitudes = new Set();
    const promises = [];

    for (let i = 0; i < numbers.length; i++) {
        for (let j = 0; j < numbers.length; j++) {
            if (i !== j) {
                promises.push(new Promise((resolve, reject) => {
                    const worker = new Worker('./partTwoSub.js', {
                        workerData: {
                            a: numbers[i],
                            b: numbers[j]
                        }
                    });

                    worker.once('message', result => {
                        magnitudes.add(result);
                        resolve(result);
                    });
                    worker.on('error', reject);
                    worker.on('exit', code => {
                        if (code === 0) resolve();
                        else reject();
                    });
                }));
            }
        }
    }

    Promise.allSettled(promises).then(() => {
        Utils.Output.outResult(Math.max(...Array.from(magnitudes)));
    });
})();
