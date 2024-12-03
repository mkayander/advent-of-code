import chalk from "chalk";

const path = `${import.meta.dir}/input.txt`;
const file = Bun.file(path);
const text = await file.text();

const grid = text.split("\n").map((line) => line.split(" ").map(Number));

const MIN_DIFF = 1;
const MAX_DIFF = 3;

const checkPair = (a: number, b: number, isIncreasing: boolean): boolean => {
    const diff = Math.abs(a - b);

    return a < b === isIncreasing && diff >= MIN_DIFF && diff <= MAX_DIFF;
};

const checkArray = (arr: number[], didFail = false): boolean => {
    const isIncreasing = arr[0] < arr[1];
    for (let i = 1; i < arr.length; i++) {
        if (!checkPair(arr[i - 1], arr[i], isIncreasing)) {
            if (didFail) return false;

            while (i >= 0) {
                if (checkArray(arr.toSpliced(i, 1), true)) {
                    return true;
                }

                i--;
            }

            return false;
        }
    }

    console.log(chalk.greenBright(arr.join(" ")));
    return true;
};

let result = 0;

for (const row of grid) {
    console.info(chalk.blueBright(row));

    if (checkArray(row)) {
        result++;
    }
}

console.log(chalk.greenBright.bold(result));
