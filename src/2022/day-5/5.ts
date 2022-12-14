export const solve = (input: string) => {
  console.log(input);

  const [plan, actions] = input.split('\n\n').map((x) => x.split('\n'));
  const indices = plan.pop();

  if (!indices) throw new Error('No indices');

  const stacks: string[][] = [];

  for (let i = plan.length - 1; i >= 0; i--) {
    for (let j = 0; j < plan[i].length; j++) {
      const index = +indices[j];
      if (!index) continue;

      stacks[index] ??= [];
      plan[i][j].trim() && stacks[index].push(plan[i][j]);
    }
  }

  const lastItems = stacks.map((x) => x[x.length - 1]);

  for (const action of actions) {
    const [, countStr, from, to] =
      action.match(/^move (\d+) from (\d+) to (\d+)$/i)?.map(Number) ?? [];

    const count = +countStr;
    const fromIndex = +from;
    const toIndex = +to;

    console.log({ count, fromIndex, toIndex });

    const chunk = stacks[fromIndex].splice(-count);
    stacks[toIndex].push(...chunk);

    // console.log(chunk);

    lastItems[fromIndex] = stacks[fromIndex][stacks[fromIndex].length - 1];
    lastItems[toIndex] = stacks[toIndex][stacks[toIndex].length - 1];
  }

  console.log({ plan, stacks, lastItems, actions });

  return lastItems.join('');
};

console.log(solve(await Deno.readTextFile('./src/input-5.txt')));
