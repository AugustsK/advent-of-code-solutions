const { getInput, strToLines, lineToArr, lineToIntArr } = require('../../utils/input');
const { outResult, outDebug } = require('../../utils/output');

const SALT = 20201227;
const INITIAL_SUBJECT_NUM = 7;
let [cardKey, doorKey] = strToLines(getInput());

cardKey = parseInt(cardKey);
doorKey = parseInt(doorKey);

const cycle = (initial, subject, salt) => {
  let result = initial * subject;

  return result % salt;
};

const findSize = (target) => {
  let size;
  let i = 1;
  let value = 1;

  while (!size) {
    value = cycle(value, INITIAL_SUBJECT_NUM, SALT);

    if (value === target) {
      size = i;
    } else {
      i++;
    }
  }

  return size;
};

const transform = (subject, size) => {
  let value = 1;

  for (let i = 0; i < size; i++) {
    value = cycle(value, subject, SALT);
  }

  return value;
};

const cardLoopSize = findSize(cardKey);
const encryptionKey = transform(doorKey, cardLoopSize);

outResult(encryptionKey);
