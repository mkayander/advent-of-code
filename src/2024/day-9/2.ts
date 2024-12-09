import chalk from "chalk";

const path = `${import.meta.dir}/input.txt`;
const file = Bun.file(path);
const text = await file.text();
const input = text.split("\n")[0];

type Segment = {
    value: number | null;
    index: number;
    size: number;
};

const parseInput = (input: string) => input.split("").map(Number);

const solve = (input: string) => {
    const diskMap = parseInput(input);
    const segments: Segment[] = [];
    let index = 0;
    let fileId = 0;

    for (let i = 0; i < diskMap.length; i++) {
        const value = i % 2 === 0 ? fileId : null;
        segments.push({ value, index, size: diskMap[i] });
        index += diskMap[i];
        if (i % 2 === 0) fileId++;
    }

    for (let i = segments.length - 1; i > 0; i--) {
        const segmentToMove = segments[i];
        if (segmentToMove.value !== null) {
            for (let n = 0; n < i; n++) {
                if (
                    segments[n].value === null &&
                    segments[n].size >= segmentToMove.size
                ) {
                    const emptySpot = segments[n];
                    segments.splice(i, 1);
                    segmentToMove.index = emptySpot.index;
                    segments.splice(n, 0, segmentToMove);
                    emptySpot.size -= segmentToMove.size;
                    emptySpot.index += segmentToMove.size;
                    break;
                }
            }
        }
    }

    let result = 0;
    for (let i = 0; i < segments.length; i++) {
        if (segments[i].value !== null) {
            for (let n = 0; n < segments[i].size; n++) {
                result += (segments[i].index + n) * segments[i].value!;
            }
        }
    }

    return result;
};

const result = solve(input);
console.log(chalk.green.bold(result));
