import chalk from "chalk";
import { iterateFileLineStrings } from "src/utils/iterateFileLines.js";

const limits: Record<string, number> = {
    red: 12,
    green: 13,
    blue: 14,
};

let result = 0;

main: for await (const line of iterateFileLineStrings(
    `${import.meta.dir}/input.txt`,
)) {
    console.log(line);
    const numRegExp = /^Game (\d+): /;
    const id = Number(line.match(numRegExp)?.[1]);
    const entries = line.replace(numRegExp, "").split("; ");

    for (const entry of entries) {
        const cubes = entry.split(", ");
        for (let i = 0; i < cubes.length; i++) {
            const [countStr, color] = cubes[i].split(" ");
            const count = Number(countStr);
            if (count > limits[color]) {
                console.warn(chalk.redBright("Invalid cube count: ", cubes[i]));
                continue main;
            }
        }
    }

    result += id;
}

console.log(chalk.greenBright.bold(result));
