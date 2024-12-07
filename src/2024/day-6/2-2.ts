import chalk from "chalk";

const path = `${import.meta.dir}/input-test.txt`;
const file = Bun.file(path);
const text = await file.text();
const input = text.split("\n").map((line) => line.split(""));

const m = input.length;
const n = input[0].length;

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

const getKey = (...args: number[]) => args.join(",");

function solve() {
    let [i, j] = findStartingPoint()!;
    let dir = 0;

    function isInBounds() {
        return i >= 0 && i < m && j >= 0 && j < n;
    }

    const stepForward = () => {
        i += DIRECTIONS[dir][0];
        j += DIRECTIONS[dir][1];
    };

    const stepBackward = () => {
        i -= DIRECTIONS[dir][0];
        j -= DIRECTIONS[dir][1];
    };

    const moveForward = () => {
        while (isInBounds() && input[i][j] !== "#") {
            stepForward();
        }
    };

    const seen = new Set<string>();

    while (true) {
        const key = getKey(i, j, dir);
        if (seen.has(key)) {
            throw new Error("Infinite loop detected");
        }
        seen.add(key);

        moveForward();
        if (!isInBounds()) break;

        if (input[i][j] === "#") {
            stepBackward();
            dir = (dir + 1) % 4;
        }
    }
}

let result = 0;
for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
        if (input[i][j] === ".") {
            try {
                input[i][j] = "#";
                solve();
                input[i][j] = ".";
            } catch (e) {
                console.log(chalk.red(`Obstruction at (${i}, ${j})`));
                result++;
                break;
            }
        }
    }
}

console.log(chalk.greenBright.bold(result));
