import chalk from "chalk";

const path = `${import.meta.dir}/input.txt`;
const file = Bun.file(path);

const text = await file.text();
const lines = text.split("\n");

const arr1 = new Array(lines.length);
const arr2 = new Array(lines.length);

for (let i = 0; i < lines.length; i++) {
  const [a, b] = lines[i].split("   ");
  arr1[i] = a;
  arr2[i] = b;
}

arr1.sort((a, b) => a - b);
arr2.sort((a, b) => a - b);

let result = 0;
for (let i = 0; i < arr1.length; i++) {
  console.info(chalk.blueBright(arr1[i], arr2[i]));
  result += Math.abs(arr1[i] - arr2[i]);
}

console.log(chalk.greenBright.bold(result));
