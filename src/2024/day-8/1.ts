import chalk from "chalk";

const path = `${import.meta.dir}/input.txt`;
const file = Bun.file(path);
const text = await file.text();
const input = text.split("\n");
const m = input.length;
const n = input[0].length;

function isInBounds(i: number, j: number) {
    return i >= 0 && i < m && j >= 0 && j < n;
}

function solve() {
    const antinodes = Array.from({ length: m }, () => new Uint8Array(n));
    const map = new Map<string, Array<[number, number]>>();

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (input[i][j] === ".") {
                continue;
            }

            const frequency = input[i][j];
            if (!map.has(frequency)) {
                map.set(frequency, []);
            }

            map.get(frequency)!.push([i, j]);
        }
    }

    let count = 0;
    for (const [frequency, nodes] of map) {
        for (const a of nodes) {
            for (const b of nodes) {
                if (a === b) {
                    continue;
                }

                const [i1, j1] = a;
                const [i2, j2] = b;
                const vector = [i2 - i1, j2 - j1];
                const [di, dj] = vector;
                let i = i2 + di;
                let j = j2 + dj;
                if (!isInBounds(i, j)) {
                    continue;
                }

                if (!antinodes[i][j]) {
                    antinodes[i][j] = 1;
                    count++;
                }
            }
        }
    }

    return count;
}

const result = solve();
console.log(chalk.greenBright.bold(`Result: ${result}`));
