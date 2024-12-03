const ENTRANCE_CHAR = "S";
const TARGET_CHAR = "E";
const ENTRANCE_HEIGHT = "a";
const TARGET_HEIGHT = "z";
const DIRECTIONS = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
];

type Location = readonly [number, number];
type Job = {
    location: Location;
    steps: number;
    height: number;
};

function findKeyPlaces(grid: string[][]): [Location, Location] {
    let entrance: Location | null = null;
    let target: Location | null = null;

    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            const place = grid[row][col];

            if (place === ENTRANCE_CHAR) {
                entrance = [row, col];
            } else if (place === TARGET_CHAR) {
                target = [row, col];
            }
        }
    }

    if (!entrance || !target) throw new Error("Entrance or target not found");

    return [entrance, target];
}

function charToHeight(char: string): number {
    switch (char) {
        case ENTRANCE_CHAR:
            return ENTRANCE_HEIGHT.charCodeAt(0);
        case TARGET_CHAR:
            return TARGET_HEIGHT.charCodeAt(0);
        default:
            return char.charCodeAt(0);
    }
}

export const shortestPath = (input: string) => {
    const grid = input.split("\n").map((row) => row.split(""));

    function getHeight(char: string): number;
    function getHeight(location: Location): number;
    function getHeight(input: string | Location): number {
        let char: string | null = null;
        if (typeof input === "string") {
            char = input;
        }

        if (Array.isArray(input)) {
            const [row, col] = input;
            char = grid[row][col];
        }

        if (!char) throw new Error("Invalid input");

        return charToHeight(char);
    }

    function isInBounds(location: Location): boolean {
        const [row, col] = location;

        return (
            row >= 0 && row < grid.length && col >= 0 && col < grid[row].length
        );
    }

    const [, target] = findKeyPlaces(grid);

    let minSteps = Infinity;

    const calculatePath = (start: Location) => {
        const queue: Job[] = [];

        queue.push({
            location: start,
            steps: 0,
            height: getHeight(ENTRANCE_HEIGHT),
        });

        const visited = new Set<string>();
        visited.add(`${start[0]},${start[1]}`);

        while (queue.length) {
            const { location, steps, height } = queue.pop()!;
            const [row, col] = location;

            for (const direction of DIRECTIONS) {
                const [dRow, dCol] = direction;
                const newLocation = [row + dRow, col + dCol] as const;
                const [nRow, nCol] = newLocation;

                if (!isInBounds(newLocation)) continue;

                const newHeight = getHeight(newLocation);

                // console.log(
                //   newLocation,
                //   steps,
                //   grid[nRow][nCol],
                //   newHeight,
                //   newHeight - height
                // );

                if (newHeight - height > 1) continue;

                if (nRow === target[0] && nCol === target[1]) {
                    minSteps = Math.min(minSteps, steps + 1);
                    break;
                }

                if (visited.has(`${nRow},${nCol}`)) continue;

                queue.unshift({
                    location: newLocation,
                    steps: steps + 1,
                    height: newHeight,
                });

                visited.add(`${nRow},${nCol}`);
            }
        }
    };

    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            const place = grid[row][col];

            if (place === ENTRANCE_HEIGHT) {
                calculatePath([row, col]);
            }
        }
    }

    return minSteps;
};

console.time("shortestPath");
console.log(shortestPath(await Deno.readTextFile("./src/input-12.txt")));
console.timeEnd("shortestPath");
