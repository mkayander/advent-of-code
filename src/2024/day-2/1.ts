import chalk from "chalk";

const path = `${import.meta.dir}/input.txt`;
const file = Bun.file(path);
const text = await file.text();

const grid = text.split("\n").map((line) => line.split(" ").map(Number));

const MIN_DIFF = 1;
const MAX_DIFF = 3;

let result = 0;

main: for (const row of grid) {
    console.info(chalk.blueBright(row));
    const isIncreasing = row[0] < row[1];

    for (let i = 1; i < row.length; i++) {
        const diff = Math.abs(row[i - 1] - row[i]);

        if (
            row[i - 1] < row[i] !== isIncreasing ||
            diff > MAX_DIFF ||
            diff < MIN_DIFF
        ) {
            continue main;
        }
    }

    result++;
}

console.log(chalk.greenBright.bold(result));
