import chalk from "chalk";

const path = `${import.meta.dir}/input.txt`;
const file = Bun.file(path);

const text = await file.text();
const lines = text.split("\n");

const arr = new Array<number>(lines.length);
const freqMap = new Map<number, number>();

for (let i = 0; i < lines.length; i++) {
  const [a, b] = lines[i].split("   ").map(Number);
  arr[i] = a;

  freqMap.set(b, (freqMap.get(b) ?? 0) + 1);
}

let result = 0;
for (const num of arr) {
  console.info(chalk.blueBright(num, freqMap.get(num)));
  result += num * (freqMap.get(num) ?? 0);
}

console.log(chalk.greenBright.bold(result));
