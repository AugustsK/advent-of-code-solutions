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

let step = 0;
let curNode = 'AAA';

while (curNode !== 'ZZZ') {
  const { l, r } = nodes.get(curNode);
  const direction = directions[step % directions.length];

  curNode = direction === 'L' ? l : r;
  step += 1;
}

OutputUtil.outResult(step);
