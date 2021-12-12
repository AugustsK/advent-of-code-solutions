const { getInput, strToLines, lineToArr, lineToIntArr, strToEmptyLineGroups } = require('../../utils/input');
const { arrIntersects, arrDiff, countInstances, sort } = require('../../utils/array');
const { outResult, outDebug } = require('../../utils/output');

const connections = {};

const mapConnection = (a, b) => {
    const connectObj = a in connections ? connections[a] : {
        links: new Set(),
        isBig: /[A-Z]/.test(a),
        id: a
    };

    connectObj.links.add(b);
    connections[a] = connectObj;
}

strToLines(getInput()).forEach(connection => {
    const [ a, b ] = connection.split('-');
    mapConnection(a, b);
    mapConnection(b, a);
});

const walk = (node, entirePath = [], visited = new Set()) => {
    let paths = 0;
    const newEntirePath = [...entirePath];

    if (visited.has(node.id)) return paths;
    else if (!node.isBig) visited.add(node.id);

    newEntirePath.push(node.id);

    Array.from(node.links).forEach(path => {
        if (path === 'end') paths += 1;
        else paths += walk(connections[path], newEntirePath, new Set(Array.from(visited)));
    });

    return paths;
}

let result = walk(connections['start']);

outResult(result);
