const Utils = require('../../utils');

const LIMIT = 100000;
const DISK_SPACE = 70000000;
const REQUIRED_AMOUNT = 30000000;

const tree = new Map();
const files = new Set();
const cwd = [];
const cwdToStr = () => cwd.join(' ');
const stdout = Utils.Input.strToLines(Utils.Input.getInput());

stdout.forEach((line) => {
  if (/^\$/.test(line)) {
    const cmd = line.replace('$ ', '');

    if (cmd.startsWith('cd')) {
      const dir = cmd.replace('cd ', '');

      if (dir === '..') {
        const subDir = cwdToStr();
        cwd.pop();
        const dir = tree.get(cwdToStr());
        dir.tree.push(subDir);
        tree.set(cwdToStr(), dir);
      } else {
        cwd.push(dir);

        if (!tree.has(cwdToStr())) {
          tree.set(cwdToStr(), {
            name: cwdToStr(),
            tree: [],
          });
        }
      }
    }
  } else if (line && !line.startsWith('dir')) {
    const dir = tree.get(cwdToStr());
    const [sizeStr, filename] = line.split(' ');
    const size = parseInt(sizeStr, 10);
    const filePath = `${cwdToStr()}.${filename}`;

    if (!files.has(filePath)) {
      dir.tree.push({
        size,
        filename,
      });

      dir.size += size;

      tree.set(cwdToStr(), dir);
      files.add(filePath);
    }
  }
});

while (cwd.length > 1) {
  const subDir = cwdToStr();
  cwd.pop();
  const dir = tree.get(cwdToStr());
  dir.tree.push(subDir);
  tree.set(cwdToStr(), dir);
}

const getDirSize = (dir) =>
  dir.tree.reduce((sum, item) => {
    if (item.size) {
      sum += item.size;
    } else if (tree.has(item)) {
      sum += getDirSize(tree.get(item));
    }

    return sum;
  }, 0);

const partOne = [...tree.values()].reduce((sum, dir) => {
  const dirSum = getDirSize(dir);

  if (dirSum <= LIMIT) {
    return sum + dirSum;
  }

  return sum;
}, 0);

const toCleanUp = REQUIRED_AMOUNT - (DISK_SPACE - getDirSize(tree.get('/')));

const partTwo = [...tree.values()].reduce((result, dir) => {
  const dirSum = getDirSize(dir);

  if (dirSum > toCleanUp && dirSum < result) {
    return dirSum;
  }

  return result;
}, Infinity);

Utils.Output.outResult(partOne);
Utils.Output.outResult(partTwo);
