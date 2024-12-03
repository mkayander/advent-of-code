import chalk from "chalk";

const path = `${import.meta.dir}/input.txt`;
const file = Bun.file(path);
const text = await file.text();
const input = text.split("\n");

const operations = ["mul", "do", "don't"] as const;
type Operation = (typeof operations)[number];

function isNumber(char: string) {
    return char >= "0" && char <= "9";
}

function getTotalMulResult() {
    let isEnabled = true;
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

            if (line[i] !== separator) {
                throw new Error(`Expected separator: ${separator}`);
            }

            return num;
        };

        const operationsMap: Record<Operation, () => void> = {
            mul: () => {
                if (!isEnabled) return;

                try {
                    const a = scanNum(",");
                    i++;
                    const b = scanNum(")");

                    result += a * b;
                } catch (e: unknown) {}
            },
            do: () => {
                if (line[i] !== ")") return;

                isEnabled = true;
            },
            "don't": () => {
                if (line[i] !== ")") return;

                isEnabled = false;
            },
        };

        const checkName = (name: string) => {
            const nameSize = name.length;
            if (i < nameSize) return false;

            for (let j = 0; j < nameSize; j++) {
                if (line[i - nameSize + j] !== name[j]) return false;
            }

            return true;
        };

        for (i; i < length; i++) {
            if (line[i] === "(") {
                for (const name of operations) {
                    if (checkName(name)) {
                        i++;
                        operationsMap[name]();
                        break;
                    }
                }
            }
        }
    }

    return result;
}

console.log(chalk.greenBright.bold(getTotalMulResult()));
