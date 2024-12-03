import chalk from "chalk";
import { readGridInput } from "src/utils/readGridInput.js";

const grid = await readGridInput(`${import.meta.dir}/input.txt`);

const width = grid[0].length;
const height = grid.length;

const DIRECTIONS = [
    [-1, -1],
    [0, -1],
    [1, -1],
    [-1, 0],
    [1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
];

const isNumber = (char: string) => char >= "0" && char <= "9";
const isSymbol = (char: string) => char !== "." && !isNumber(char);

let result = 0;

const extractNum = (row: number, col: number) => {
    let left = col;
    let right = col;

    while (left >= 0 && isNumber(grid[row][left])) {
        left--;
    }

    while (right < width && isNumber(grid[row][right])) {
        right++;
    }

    const num = Number(grid[row].slice(left + 1, right).join(""));

    for (let i = left + 1; i < right; i++) {
        grid[row][i] = ".";
    }

    return num;
};

const findAdjacentNums = (row: number, col: number) => {
    const adjacentNums: number[] = [];

    for (const [dRow, dCol] of DIRECTIONS) {
        const newRow = row + dRow;
        const newCol = col + dCol;

        if (newRow >= 0 && newRow < height && newCol >= 0 && newCol < width) {
            const char = grid[newRow][newCol];

            if (isNumber(char)) {
                adjacentNums.push(extractNum(newRow, newCol));
            }
        }
    }

    return adjacentNums;
};

for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
        const char = grid[row][col];

        if (isSymbol(char)) {
            const nums = findAdjacentNums(row, col);
            if (nums.length === 0) continue;

            console.info(chalk.blueBright(JSON.stringify(nums)));
            result += nums.reduce((a, b) => a + b, 0);
        }
    }
}

grid.forEach((row) => console.log(row.join("")));

console.log(chalk.greenBright.bold(result));
