import chalk from "chalk";

const path = `${import.meta.dir}/input-test.txt`;
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
            if (input[i][j] === "^") return [i, j];
        }
    }
    throw new Error("No starting point found");
}

const DIRECTIONS = [
    [-1, 0], // up
    [0, 1], // right
    [1, 0], // down
    [0, -1], // left
];

const stepForward = (i: number, j: number, dir: number) => {
    return [i + DIRECTIONS[dir][0], j + DIRECTIONS[dir][1]];
};

const getKey = (i: number, j: number, dir?: number) =>
    dir !== undefined ? `${i},${j},${dir}` : `${i},${j}`;

function isStuckInLoopWithObstruction(
    startI: number,
    startJ: number,
    obstructionI: number,
    obstructionJ: number,
): boolean {
    const visited = new Set<string>();
    let i = startI;
    let j = startJ;
    let dir = 0; // Start facing up

    while (true) {
        const key = getKey(i, j, dir);
        if (visited.has(key)) {
            // If we revisit the same state, we are in a loop
            return true;
        }
        visited.add(key);

        // Move forward
        let [ni, nj] = stepForward(i, j, dir);

        // If moving forward hits the obstruction or a wall
        if (
            (ni === obstructionI && nj === obstructionJ) ||
            !isInBounds(ni, nj) ||
            input[ni][nj] === "#"
        ) {
            // Turn clockwise
            dir = (dir + 1) % 4;
        } else {
            // Otherwise, move to the next position
            i = ni;
            j = nj;
        }

        // If the guard leaves the grid, it's not a loop
        if (!isInBounds(i, j)) {
            return false;
        }
    }
}

function countValidObstructionPositions(
    startI: number,
    startJ: number,
): number {
    let count = 0;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            // Skip walls and the guard's starting position
            if (input[i][j] === "#" || (i === startI && j === startJ)) {
                continue;
            }

            // Check if placing an obstruction at (i, j) causes a loop
            if (isStuckInLoopWithObstruction(startI, startJ, i, j)) {
                count++;
            }
        }
    }

    return count;
}

const [startI, startJ] = findStartingPoint()!;
const result = countValidObstructionPositions(startI, startJ);

console.log(
    chalk.greenBright.bold(`Possible obstruction positions: ${result}`),
);
