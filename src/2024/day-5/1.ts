import chalk from "chalk";

const path = `${import.meta.dir}/input.txt`;
const file = Bun.file(path);
const text = await file.text();
const input = text.split("\n");
const pivot = input.indexOf("");
const rules = input.slice(0, pivot);
const pages = input.slice(pivot + 1).map((page) => page.split(","));

// const adjList: Record<string, string[]> = {};
// const indegrees: Record<string, number> = {};
const map = new Map<string, Set<string>>();

for (const rule of rules) {
    const [from, to] = rule.split("|");
    // (adjList[from] ??= []).push(to);

    // indegrees[from] ??= 0;
    // indegrees[to] ??= 0;
    // indegrees[to]++;

    if (!map.has(to)) {
        map.set(to, new Set());
    }
    map.get(to)!.add(from);
}

function isPageValid(page: string[]) {
    let forbidden = new Set();

    for (let i = 0; i < page.length; i++) {
        const node = page[i];
        if (forbidden.has(node)) {
            return false;
        }
        if (map.has(node)) {
            forbidden = forbidden.union(map.get(node)!);
        }
    }

    return true;
}

let result = 0;
for (const page of pages) {
    if (isPageValid(page)) {
        result += +page[Math.floor(page.length / 2)];
    }
}

console.log(chalk.greenBright.bold(result));
