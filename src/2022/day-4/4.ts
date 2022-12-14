export const solve = (input: string) => {
  const arr = input.split('\n');

  let count = 0;

  for (const row of arr) {
    const [left, right] = row.split(',');

    const leftVals = left.split('-').map((x) => parseInt(x, 10));
    const rightVals = right.split('-').map((x) => parseInt(x, 10));

    // if (leftVals[0] >= rightVals[0] && leftVals[1] <= rightVals[1]) {
    //   count++;
    // } else if (leftVals[0] <= rightVals[0] && leftVals[1] >= rightVals[1]) {
    //   count++;
    // }

    let isIntersecting = false;

    for (let i = leftVals[0]; i <= leftVals[1]; i++) {
      if (i >= rightVals[0] && i <= rightVals[1]) {
        isIntersecting = true;
        break;
      }
    }

    if (isIntersecting) {
      count++;
    }

    console.log({ left, right, leftVals, rightVals });
  }

  return count;
};

console.log(solve(await Deno.readTextFile('./src/input-4.txt')));
