import { InputUtil, OutputUtil, MathUtil, ArrayUtil } from '../../utils';

const valuesP1 = InputUtil.strToLines(InputUtil.getInput()).map((line) => {
  const digits = line.split('').filter((char) => /\d/.test(char));
  const firstItem = digits[0];
  const lastItem = digits[digits.length - 1]; // Caters for if line only has 1 digit

  return Number.parseInt(firstItem + lastItem, 10);
});

const partOne = valuesP1.reduce((sum, cur) => sum + cur, 0);

const word2number = (str: string) => {
  let result = str;

  while (/one|two|three|four|five|six|seven|eight|nine/.test(result)) {
    result = result.replace(/one|two|three|four|five|six|seven|eight|nine/, (match) => {
      switch (match) {
        case 'one':
          return '1e'; // this is retarded, but apparently oneight counts as 18 instead of 1ight
        case 'two':
          return '2o';
        case 'three':
          return '3e';
        case 'four':
          return '4r';
        case 'five':
          return '5e';
        case 'six':
          return '6x';
        case 'seven':
          return '7n';
        case 'eight':
          return '8t';
        case 'nine':
          return '9e';
        default:
          return '';
      }
    });
  }

  return result;
};

const valuesP2 = InputUtil.strToLines(InputUtil.getInput()).map((line) => {
  const digits = word2number(line)
    .split('')
    .filter((char) => /\d/.test(char));
  const firstItem = digits[0];
  const lastItem = digits[digits.length - 1]; // Caters for if line only has 1 digit

  return Number.parseInt(firstItem + lastItem, 10);
});

const partTwo = valuesP2.reduce((sum, cur) => sum + cur, 0);

OutputUtil.outResult(partOne);
OutputUtil.outResult(partTwo);
