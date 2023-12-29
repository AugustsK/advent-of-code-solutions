const Utils = require('../../utils');

let curMask = '';
const memory = {};

const parseValue = (value = 0, mask = '') => {
  const binaryValue = toBinary(value, mask.length);
  let result = '';

  for (let i = 0; i < mask.length; i++) result += mask[i] === 'X' ? binaryValue[i] : mask[i];

  return result;
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
    const maskedValue = toDecimal(parseValue(value, curMask));
    const [, address] = action.match(/mem\[([0-9]+)\]/);

    memory[address] = maskedValue;

    if (Utils.Input.debugEnabled()) {
      Utils.Output.outDebug(`VALUE:  ${toBinary(value, curMask.length)}  (decimal: ${value})`);
      Utils.Output.outDebug(`MASK:   ${curMask}`);
      Utils.Output.outDebug(`RESULT: ${parseValue(value, curMask)}  (decimal: ${maskedValue})`);
      Utils.Output.outDebug(`============================================`);
    }
  }
};

Utils.Input.strToLines(Utils.Input.getInput()).forEach(execute);
Utils.Output.outResult(Object.values(memory).reduce((sum, x) => sum + x, 0));
