import chalk from "chalk";

const path = `${import.meta.dir}/input.txt`;
const file = Bun.file(path);
const text = await file.text();
const input = text.split("\n");
const pivot = input.indexOf("");
const rules = input.slice(0, pivot);
const pages = input.slice(pivot + 1).map((page) => page.split(","));

const adjList: Record<string, string[]> = {};
const map = new Map<string, Set<string>>();

for (const rule of rules) {
    const [from, to] = rule.split("|");
    (adjList[from] ??= []).push(to);

    if (!map.has(to)) {
        map.set(to, new Set());
    }
    map.get(to)!.add(from);
}
// console.log(adjList);
// console.log(map);

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
    if (isPageValid(page)) continue;

    const nums = new Set(page);
    const indegrees: Record<string, number> = {};

    for (const num of page) {
        indegrees[num] ??= 0;
        if (!adjList[num]) continue;

        for (const next of adjList[num]) {
            if (!nums.has(next)) continue;

            indegrees[next] ??= 0;
            indegrees[next]++;
        }
    }

    const newPage = [];
    const queue: string[] = [];
    for (const num of page) {
        if (indegrees[num] === 0) {
            queue.push(num);
            newPage.push(num);
        }
    }

    while (queue.length) {
        const num = queue.shift()!;
        if (!adjList[num]) continue;

        for (const next of adjList[num]) {
            if (!nums.has(next)) continue;

            indegrees[next]--;
            if (indegrees[next] === 0) {
                queue.push(next);
                newPage.push(next);
            }
        }
    }

    console.log(newPage);
    result += +newPage[Math.floor(newPage.length / 2)];
}

console.log(chalk.greenBright.bold(result));
