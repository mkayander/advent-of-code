import chalk from "chalk";

const path = `${import.meta.dir}/input.txt`;
const file = Bun.file(path);
const text = await file.text();
const input = text.split("\n").map((line) => line.split(""));

const m = input.length;
const n = input[0].length;

function isInBounds(i: number, j: number) {
    return i >= 0 && i < m && j >= 0 && j < n;
}

function findStartingPoint() {
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (input[i][j] === "^") {
                return [i, j];
            }
        }
    }

    return null;
}

const DIRECTIONS = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
];

const stepForward = (i: number, j: number, dir: number) => {
    i += DIRECTIONS[dir][0];
    j += DIRECTIONS[dir][1];
    return [i, j];
};

const stepBackward = (i: number, j: number, dir: number) => {
    i -= DIRECTIONS[dir][0];
    j -= DIRECTIONS[dir][1];
    return [i, j];
};

const getKey = (...args: number[]) => args.join(",");

function scan(i: number, j: number, dir: number) {
    const seen = new Set<string>();

    const moveForward = () => {
        while (isInBounds(i, j) && input[i][j] !== "#") {
            const key = getKey(i, j, dir);
            if (seen.has(key)) {
                throw new Error("Loop detected");
            }
            seen.add(key);
            [i, j] = stepForward(i, j, dir);
        }
    };

    while (true) {
        moveForward();
        if (!isInBounds(i, j)) break;

        if (input[i][j] === "#") {
            [i, j] = stepBackward(i, j, dir);
            dir = (dir + 1) % 4;
        }
    }
}

const [startI, startJ] = findStartingPoint()!;
let result = 0;
for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
        if (input[i][j] === ".") {
            try {
                input[i][j] = "#";
                scan(startI, startJ, 0);
            } catch (e) {
                console.log(chalk.red(`Obstruction at (${i}, ${j})`));
                result++;
            } finally {
                input[i][j] = ".";
            }
        }
    }
}

console.log(chalk.greenBright.bold(result));
