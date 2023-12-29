const Utils = require('../../utils');

const doMathYo = (line, depth = 0) => {
  let toMultiply = [];
  let result = null;
  let a = null;
  let b = null;
  let operator = null;
  let i = 0;

  while (i < line.length) {
    if (/[0-9]/.test(line[i])) {
      if (!a) a = parseInt(line[i]);
      else if (!b) b = parseInt(line[i]);
    } else if (['+', '*'].includes(line[i])) {
      operator = line[i];
    } else if (line[i] === '(') {
      const { result: subResult, len: jump } = doMathYo(line.slice(i + 1), depth + 1);

      if (!a) a = subResult;
      else if (!b) b = subResult;

      i += jump;
    } else if (line[i] === ')') {
      return {
        result: toMultiply.reduce((res, x) => res * x, a),
        len: i + 1,
      };
    }

    if (a && b && operator) {
      switch (operator) {
        case '+':
          result = a + b;
          a = result;
          b = null;

          break;
        case '*':
          toMultiply.push(a);
          a = b;
          b = null;

          break;
      }

      operator = null;
    }

    i++;
  }

  return toMultiply.reduce((res, x) => res * x, a);
};

const lines = Utils.Input.strToLines(Utils.Input.getInput()).map((line) => doMathYo(line.replace(/\s/g, '')));

Utils.Output.outDebug(lines);
Utils.Output.outResult(lines.reduce((sum, x) => sum + x, 0));
