import chalk from "chalk";

const path = `${import.meta.dir}/input.txt`;
const file = Bun.file(path);
const text = await file.text();
const input: Array<[bigint, bigint[]]> = text.split("\n").map((line) => {
    const [sum, nums] = line.split(": ");
    return [BigInt(sum), nums.split(" ").map((num) => BigInt(num))];
});

function concat(a: bigint, b: bigint): bigint {
    return BigInt(a.toString() + b.toString());
}

function solve() {
    let totalSum = 0n;

    for (const [sum, nums] of input) {
        const canSolve = (current: bigint, i: number): boolean => {
            if (i === nums.length) {
                return current === sum;
            }

            return (
                canSolve(current + nums[i], i + 1) ||
                canSolve(current * nums[i], i + 1) ||
                canSolve(concat(current, nums[i]), i + 1)
            );
        };

        if (canSolve(0n, 0)) {
            totalSum += sum;
        }
    }

    return totalSum;
}

const result = solve();
console.log(result);
