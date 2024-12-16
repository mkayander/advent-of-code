import chalk from "chalk";

const path = `${import.meta.dir}/input-test.txt`;
const file = Bun.file(path);
const text = await file.text();
const input = text.split("\n");
const m = input.length;
const n = input[0].length;

function isInBounds(i: number, j: number): boolean {
    return i >= 0 && i < m && j >= 0 && j < i;
}

const DIRECTIONS = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
];

let startI = -1;
let startJ = -1;

for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
        if (input[i][j] === "S") {
            startI = i;
            startJ = j;
            break;
        }
    }
}

console.log({ startI, startJ });

const getKey = (i: number, j: number, dir: number) => `${i},${j},${dir}`;
const memo = new Map<string, number>();

const STEP_COST = 1;
const TURN_COST = 1000;

const stepForward = (i: number, j: number, dir: number): [number, number] => {
    const [dx, dy] = DIRECTIONS[dir];
    return [i + dx, j + dy];
};

const dfs = (i: number, j: number, dir: number): number => {
    if (!isInBounds(i, j) || input[i][j] === "#") {
        return Infinity;
    }
    if (input[i][j] === "E") {
        console.log({ i, j, dir, memo });
        return 0;
    }

    const key = getKey(i, j, dir);
    if (memo.has(key)) {
        return memo.get(key)!;
    }
    memo.set(key, Infinity);

    const [nextI, nextJ] = stepForward(i, j, dir);
    let score = STEP_COST + dfs(nextI, nextJ, dir);

    score = Math.min(score, TURN_COST + dfs(i, j, (dir + 1) % 4));

    memo.set(key, score);
    return score;
};

const result = dfs(startI, startJ, 0);

console.log(chalk.greenBright.bold(result));
