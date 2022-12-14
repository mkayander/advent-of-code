export const firstDistinctChars = (input: string) => {
  const WINDOW_LENGTH = 14;

  let chunk = input.slice(0, WINDOW_LENGTH);

  let endIndex = WINDOW_LENGTH - 1;

  let isDistinct = new Set(chunk).size === chunk.length;

  while (!isDistinct) {
    endIndex++;
    chunk = input.slice(endIndex - WINDOW_LENGTH, endIndex);
    isDistinct = new Set(chunk).size === chunk.length;
  }

  return endIndex;
};

console.time('firstDistinctChars');
console.log(firstDistinctChars(await Deno.readTextFile('./src/input-6.txt')));
console.timeEnd('firstDistinctChars');
