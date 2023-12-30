import { InputUtil, OutputUtil, MathUtil, ArrayUtil } from '../../utils';

const [directions, , ...nodesRaw] = InputUtil.strToLines(InputUtil.getInput());

const nodes = new Map<
  string,
  {
    l: string;
    r: string;
  }
>(
  nodesRaw.map((nodeStr) => {
    const [node, rest] = nodeStr.split(' = ');
    const [l, r] = rest.replace(/[(|)]/g, '').split(', ');

    return [
      node,
      {
        l,
        r,
      },
    ];
  }),
);

const startingNodes = [...nodes.keys()].filter((node) => node.endsWith('A'));

const stepsForNodes = startingNodes.map((node) => {
  let curNode = node;
  let step = 0;

  while (!curNode.endsWith('Z')) {
    const { l, r } = nodes.get(curNode);
    const direction = directions[step % directions.length];

    curNode = direction === 'L' ? l : r;
    step += 1;
  }

  return step;
});

OutputUtil.outResult(stepsForNodes.reduce((lcm, cur) => MathUtil.lcm(lcm, cur), 1));
