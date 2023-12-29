const Utils = require('../../utils');

let curMask = '';
const memory = {};

const getAddresses = (value = 0, mask = '') => {
  const binaryValue = toBinary(value, mask.length);
  let results = [''];

  for (let i = 0; i < mask.length; i++) {
    if (mask[i] === 'X') {
      let withZero = results.map((address) => address + '0');
      let withOne = results.map((address) => address + '1');

      results = [...withZero, ...withOne];
    } else {
      results = results.map((address) => address + (mask[i] === '0' ? binaryValue[i] : '1'));
    }
  }

  return results;
};

const toBinary = (value = '', length = 0) => {
  return parseInt(value, 10).toString(2).padStart(length, '0');
};

const toDecimal = (value = '') => {
  return parseInt(value, 2);
};

const execute = (instruction = '', i = 0, program = []) => {
  const [action, value] = instruction.split(' = ');

  if (action === 'mask') {
    curMask = value;
  } else {
    const binaryValue = toBinary(value, curMask.length);
    const [, address] = action.match(/mem\[([0-9]+)\]/);
    const maskedAddresses = getAddresses(parseInt(address, 10), curMask);

    maskedAddresses.forEach((address) => {
      memory[toDecimal(address)] = parseInt(value, 10);
    });

    Utils.Output.outDebug(`VALUE:   ${binaryValue}  (decimal: ${value})`);
    Utils.Output.outDebug(`MASK:    ${curMask}`);
    maskedAddresses.forEach((address) => {
      Utils.Output.outDebug(`ADDRESS: ${address}  (decimal: ${toDecimal(address)})`);
    });
    Utils.Output.outDebug(`=============================================`);
  }
};

Utils.Input.strToLines(Utils.Input.getInput()).forEach(execute);
Utils.Output.outResult(Object.values(memory).reduce((sum, x) => sum + x, 0));
