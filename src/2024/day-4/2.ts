import chalk from "chalk";

const path = `${import.meta.dir}/input.txt`;
const file = Bun.file(path);
const text = await file.text();
const input = text.split("\n");

const m = input.length;
const n = input[0].length;

const set = new Set(["M", "S"]);

function findWords() {
    let result = 0;

    for (let i = 1; i < m - 1; i++) {
        for (let j = 1; j < n - 1; j++) {
            if (input[i][j] === "A") {
                if (
                    !set.has(input[i - 1][j - 1]) ||
                    !set.has(input[i + 1][j + 1]) ||
                    !set.has(input[i - 1][j + 1]) ||
                    !set.has(input[i + 1][j - 1]) ||
                    input[i - 1][j - 1] === input[i + 1][j + 1] ||
                    input[i - 1][j + 1] === input[i + 1][j - 1]
                )
                    continue;

                result++;
            }
        }
    }

    return result;
}

console.log(chalk.greenBright.bold(findWords()));
