import chalk from "chalk";

const path = `${import.meta.dir}/input.txt`;
const file = Bun.file(path);
const text = await file.text();
const input = text.split("\n");

function isNumber(char: string) {
    return char >= "0" && char <= "9";
}

function getTotalMulResult() {
    let result = 0;

    for (const line of input) {
        const length = line.length;
        let i = 0;

        const scanNum = (separator: string) => {
            let num = 0;
            while (i < length && line[i] !== separator) {
                if (isNumber(line[i])) {
                    num = num * 10 + +line[i];
                } else {
                    throw new Error(`Unexpected character: ${line[i]}`);
                }
                i++;
            }

            return num;
        };

        for (i; i < length; i++) {
            if (line[i] === "(") {
                if (i < 3) continue;
                if (line.slice(i - 3, i) !== "mul") continue;
                i++;

                try {
                    const a = scanNum(",");
                    i++;
                    const b = scanNum(")");

                    result += a * b;
                } catch (e: unknown) {}
            }
        }
    }

    return result;
}

console.log(chalk.greenBright.bold(getTotalMulResult()));
