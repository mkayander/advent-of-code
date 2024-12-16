import chalk from "chalk";

const path = `${import.meta.dir}/input.txt`;
const file = Bun.file(path);
const text = await file.text();
const input = text.split("\n");
const m = input.length;
const n = input[0].length;

function isInBounds(i: number, j: number): boolean {
    return i >= 0 && i < m && j >= 0 && j < i;
}

const DIRECTIONS = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
];

class Area {
    key: string;
    area: number;
    perimeter: number;

    constructor(key: string, area: number, perimeter: number) {
        this.key = key;
        this.area = area;
        this.perimeter = perimeter;
    }

    merge(other: Area) {
        this.area += other.area;
        this.perimeter += other.perimeter;
    }
}

const getKey = (i: number, j: number) => `${i},${j}`;

class UnionFind {
    ranks = new Map<string, number>();
    parents = new Map<string, string>();
    data = new Map<string, Area>();

    initArea(key: string) {
        this.ranks.set(key, 1);
        this.parents.set(key, key);
        this.data.set(key, new Area(key, 1, 0));
    }

    getItemByKey(key: string) {
        const parent = this.find(key);
        if (!parent) return null;

        return this.data.get(parent);
    }

    find(key: string): string {
        let parent = this.parents.get(key);
        if (parent === undefined) {
            this.initArea(key);
            return key;
        }

        while (parent !== this.parents.get(parent)) {
            parent = this.parents.get(this.parents.get(parent)!)!;
        }

        return parent;
    }

    union(a: string, b: string) {
        let parent = this.find(a);
        let child = this.find(b);
        if (parent === child) return false;

        if (this.ranks.get(parent)! < this.ranks.get(child)!) {
            [parent, child] = [child, parent];
        }

        this.parents.set(child, parent);
        this.ranks.set(
            parent,
            this.ranks.get(parent)! + this.ranks.get(child)!,
        );

        this.data.get(parent)!.merge(this.data.get(child)!);

        this.data.delete(child);
        this.ranks.delete(child);

        return true;
    }
}

const uf = new UnionFind();

for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
        const key = getKey(i, j);
        const type = input[i][j];

        let perimeter = 0;

        for (const [di, dj] of DIRECTIONS) {
            const ni = i + di;
            const nj = j + dj;
            if (isInBounds(ni, nj) && input[ni][nj] === type) {
                const nextKey = getKey(ni, nj);
                uf.union(key, nextKey);
            } else {
                perimeter++;
            }
        }

        uf.getItemByKey(key)!.perimeter += perimeter;
    }
}

let result = 0;
for (const data of uf.data.values()) {
    const [i, j] = data.key.split(",").map(Number);
    result += data.area * data.perimeter;
}

console.log(chalk.green.bold(result));
