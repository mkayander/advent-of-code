import chalk from "chalk";
import { iterateFileLineStrings } from "src/utils/iterateFileLines.js";

let result = 0;

for await (const line of iterateFileLineStrings(
    `${import.meta.dir}/input.txt`,
)) {
    console.log(line);
    const numRegExp = /^Game (\d+): /;
    const entries = line.replace(numRegExp, "").split("; ");

    const maxCounts: Record<string, number> = {
        red: 0,
        green: 0,
        blue: 0,
    };

    for (const entry of entries) {
        const cubes = entry.split(", ");
        for (let i = 0; i < cubes.length; i++) {
            const [countStr, color] = cubes[i].split(" ");
            const count = Number(countStr);
            if (count > maxCounts[color]) {
                maxCounts[color] = count;
            }
        }
    }

    console.info(chalk.blueBright(JSON.stringify(maxCounts)));

    result += maxCounts.red * maxCounts.green * maxCounts.blue;
}

console.log(chalk.greenBright.bold(result));
