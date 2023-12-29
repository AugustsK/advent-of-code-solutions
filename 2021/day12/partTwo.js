const { getInput, strToLines, lineToArr, lineToIntArr, strToEmptyLineGroups } = require('../../utils/input');
const { arrIntersects, arrDiff, countInstances, sort } = require('../../utils/array');
const { outResult, outDebug } = require('../../utils/output');

const connections = {};

const mapConnection = (a, b) => {
  const connectObj =
    a in connections
      ? connections[a]
      : {
          links: new Set(),
          isBig: /[A-Z]/.test(a),
          id: a,
          onlyOnce: ['start', 'end'].includes(a),
        };

  connectObj.links.add(b);
  connections[a] = connectObj;
};

strToLines(getInput()).forEach((connection) => {
  const [a, b] = connection.split('-');
  mapConnection(a, b);
  mapConnection(b, a);
});

const walk = (node, entirePath = [], visited = new Set(), flag = false) => {
  let paths = 0;
  const newEntirePath = [...entirePath];

  if (visited.has(node.id)) {
    if (flag || node.onlyOnce) return paths;
    else {
      flag = true;
    }
  } else if (!node.isBig) visited.add(node.id);

  newEntirePath.push(node.id);

  Array.from(node.links).forEach((path) => {
    if (path === 'end') paths += 1;
    else paths += walk(connections[path], newEntirePath, new Set(Array.from(visited)), flag);
  });

  return paths;
};

let result = walk(connections['start']);

outResult(result);
