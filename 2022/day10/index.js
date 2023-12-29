const Utils = require('../../utils');

const state = {
  strenghts: [],
  register: 1,
  _cycle: 0,
  pixels: '',
};

Object.defineProperty(state, 'cycle', {
  get() {
    return this._cycle;
  },

  set(value) {
    const x = this._cycle % 40;

    if (x === 0) {
      this.pixels += '\n';
    }

    const spriteMin = this.register - 1;
    const spriteMax = spriteMin + 2;

    this.pixels += x >= spriteMin && x <= spriteMax ? '█' : ' ';
    this._cycle = value;

    if ((this._cycle + 20) % 40 === 0) {
      this.strenghts.push(this.register * this._cycle);
    }
  },
});

Utils.Input.strToLines(Utils.Input.getInput())
  .filter((line) => !!line)
  .forEach((line) => {
    const [cmd, amountStr] = line.split(' ');
    const amount = parseInt(amountStr, 10);
    state.cycle += 1;

    if (cmd === 'addx') {
      state.cycle += 1;
      state.register += amount;
    }
  });

let partOne = state.strenghts.reduce((acc, cur) => acc + cur, 0);
let partTwo = state.pixels;

Utils.Output.outResult(partOne);
Utils.Output.outResult(partTwo);
