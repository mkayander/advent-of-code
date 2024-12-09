import chalk from "chalk";

const path = `${import.meta.dir}/input.txt`;
const file = Bun.file(path);
const text = await file.text();
const input = text.split("\n")[0];
const n = input.length;

function solve() {
    let i = 0;
    let j = n - 1;
    let blockId = 0;
    let leftId = 0;
    let rightId = (n - 1) / 2;
    let rightCapacity = +input[j];

    let checksum = 0;

    while (leftId < rightId) {
        let leftBlocks = +input[i++];
        while (leftBlocks-- > 0) {
            checksum += leftId * blockId;
            // console.log(`${blockId} * ${leftId}`, checksum);
            blockId++;
        }
        leftId++;

        let freeBlocks = +input[i++];
        while (freeBlocks-- > 0) {
            checksum += rightId * blockId;
            // console.log(`${blockId} * ${rightId}`, checksum);
            blockId++;

            rightCapacity--;
            if (rightCapacity === 0) {
                j -= 2;
                rightCapacity = +input[j];
                rightId--;
            }
        }
    }

    while (rightCapacity-- > 0) {
        checksum += rightId * blockId;
        // console.log(`${blockId} * ${rightId}`, checksum);
        blockId++;
    }

    return checksum;
}

const result = solve();
console.log(chalk.green.bold(result));
