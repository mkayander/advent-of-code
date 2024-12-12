import chalk from "chalk";

const path = `${import.meta.dir}/input.txt`;
const file = Bun.file(path);
const text = await file.text();
const input = text.split("\n")[0];

const STEPS = 75;
const MULT = 2024;

const getKey = (step: number, num: number) => `${step},${num}`;
const memo = new Map<string, number>();

const dfs = (step: number, num: number): number => {
    if (step === 0) {
        return 1;
    }

    const key = getKey(step, num);
    if (memo.has(key)) {
        return memo.get(key)!;
    }

    let str = null;
    let count = 0;
    if (num === 0) {
        count = dfs(step - 1, 1);
    } else if ((str = num.toString()).length % 2 === 0) {
        count =
            dfs(step - 1, Number(str.slice(0, str.length / 2))) +
            dfs(step - 1, Number(str.slice(str.length / 2)));
    } else {
        count = dfs(step - 1, num * MULT);
    }

    memo.set(key, count);
    return count;
};

let result = 0;
for (const num of input.split(" ").map(Number)) {
    result += dfs(STEPS, num);
}

console.log(chalk.green.bold(result));
