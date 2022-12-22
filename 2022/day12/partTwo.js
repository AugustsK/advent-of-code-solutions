const { Worker } = require('worker_threads')
const Utils = require('../../utils');

const coords = (x, y) => `${x}-${y}`;
const heightStrToInt = char => char.charCodeAt(0) - (char.toUpperCase() === char ? 38 : 96);

const rootGrid = new Map();
const rootQueue = new Set();
const min = [0, 0];
let max = [];
const allPossibleStarts = [];
let mainStart;
let end;

Utils.Input.strToLines(Utils.Input.getInput()).forEach((line, y, yArr) => {
    line.split('').forEach((height, x, xArr) => {
        if (height === 'S') {
            mainStart = [x, y];
            rootGrid.set(coords(x, y), {
                height: 0,
                path: 0,
                coords: [x, y],
                coordStr: coords(x, y)
            });
        } else if (height === 'E') {
            end = [x, y];
            rootGrid.set(coords(x, y), {
                height: heightStrToInt('z'),
                path: Infinity,
                coords: [x, y],
                coordStr: coords(x, y)
            });
        } else {
            if (height === 'a') {
                allPossibleStarts.push([x, y]);
            }

            rootGrid.set(coords(x, y), {
                height: heightStrToInt(height),
                path: Infinity,
                coords: [x, y],
                coordStr: coords(x, y)
            });
        }

        rootQueue.add(coords(x, y));
        max = [xArr.length - 1, yArr.length - 1];
    })
});

const spawnThread = (grid, queue, start) => new Promise((resolve) => {
    const worker = new Worker('./sub.js', {
        workerData: {
            grid,
            queue,
            start,
            end,
            min,
            max
        }
    });

    worker.once('message', result => {
        resolve(result);
    });
})

const main = async () => {
    const partOnePromise = spawnThread(new Map(rootGrid.entries()), new Set(rootQueue.values()), mainStart);
    const partTwoPromises = [
        partOnePromise,
        allPossibleStarts.map(start => spawnThread(new Map(rootGrid.entries()), new Set(rootQueue.values()), start))
    ]
    const partOne = await partOnePromise;
    const partTwo = (await Promise.all(partTwoPromises)).reduce((result, current) => {
        return current < result ? current : result;
    }, partOne);

    Utils.Output.outResult(partOne);
    Utils.Output.outResult(partTwo);
}

main();
