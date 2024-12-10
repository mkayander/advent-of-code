import chalk from "chalk";

const path = `${import.meta.dir}/input.txt`;
const file = Bun.file(path);
const text = await file.text();
const input = text.split("\n").map((line) => line.split("").map(Number));
const n = input.length;
const m = input[0].length;

function isInBounds(i: number, j: number): boolean {
    return i >= 0 && i < n && j >= 0 && j < m;
}

const DIRECTIONS = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
];

function solve() {
    const dp = Array.from({ length: n }, () =>
        Array.from({ length: m }, () => 0),
    );

    const dfs = (i: number, j: number): number => {
        if (dp[i][j] !== 0) {
            return dp[i][j];
        }
        if (input[i][j] === 9) return 1;

        const height = input[i][j];

        let result = 0;
        for (const [di, dj] of DIRECTIONS) {
            const ni = i + di;
            const nj = j + dj;
            if (isInBounds(ni, nj) && input[ni][nj] - height === 1) {
                result += dfs(ni, nj);
            }
        }

        dp[i][j] = result;
        return result;
    };

    let totalScore = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (input[i][j] === 0) {
                totalScore += dfs(i, j);
            }
        }
    }

    return totalScore;
}

const result = solve();
console.log(chalk.green.bold(result));
