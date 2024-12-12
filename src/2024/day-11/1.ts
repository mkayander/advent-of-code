import chalk from "chalk";

const path = `${import.meta.dir}/input.txt`;
const file = Bun.file(path);
const text = await file.text();
const input = text.split("\n")[0];

const STEPS = 25;
const MULT = 2024;

let stones = input.split(" ").map(Number);
for (let x = 0; x < STEPS; x++) {
    let next = [];

    for (const num of stones) {
        let str = null;
        if (num === 0) {
            next.push(1);
        } else if ((str = num.toString()).length % 2 === 0) {
            next.push(Number(str.slice(0, str.length / 2)));
            next.push(Number(str.slice(str.length / 2)));
        } else {
            next.push(num * MULT);
        }
    }

    stones = next;
}

const result = stones.length;
console.log(chalk.green.bold(result));
