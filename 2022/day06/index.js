const Utils = require('../../utils');

let partOne = null;
let partTwo = null;

const buffer = Utils.Input.getInput().split('');

for (let i = 3; i < buffer.length; i++) {
    const packetStart = new Set(buffer.slice(i - 3, i + 1));

    if (!partOne && packetStart.size === 4) {
        partOne = i + 1;
    }

    if (i > 13) {
        const messageStart = new Set(buffer.slice(i - 13, i + 1));

        if (messageStart.size === 14) {
            partTwo = i + 1;
            i = buffer.length;
        }
    }
}

Utils.Output.outResult(partOne);
Utils.Output.outResult(partTwo);
