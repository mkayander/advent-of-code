import chalk from "chalk";

const path = `${import.meta.dir}/input.txt`;
const file = Bun.file(path);
const text = await file.text();
const input = text.split("\n");

const m = input.length;
const n = input[0].length;

const TARGET = "XMAS";
const DIRECTIONS = [
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
];
function isInBounds(i: number, j: number) {
    return i >= 0 && i < m && j >= 0 && j < n;
}

function findWords() {
    let result = 0;

    const scan = (i: number, j: number, dir: number) => {
        const [di, dj] = DIRECTIONS[dir];

        for (let k = 0; k < TARGET.length; k++) {
            const ni = i + k * di;
            const nj = j + k * dj;

            if (!isInBounds(ni, nj) || input[ni][nj] !== TARGET[k]) {
                return 0;
            }
        }

        return 1;
    };

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            for (let dir = 0; dir < DIRECTIONS.length; dir++) {
                result += scan(i, j, dir);
            }
        }
    }

    return result;
}

console.log(chalk.greenBright.bold(findWords()));
