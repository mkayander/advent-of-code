type Location = { x: number; y: number };

const AIR_CHARS = [".", ",", undefined];

class RegolithReservoir {
    private grid: string[][] = [[]];
    private rocks: Location[][] = [];

    private minPos: Location = { x: Infinity, y: Infinity };
    private maxPos: Location = { x: -Infinity, y: -Infinity };

    private directions: Location[] = [
        { x: 0, y: 1 },
        { x: -1, y: 1 },
        { x: 1, y: 1 },
    ];

    unitsAtRest = 0;

    constructor(
        input: string,
        readonly pouringSpot: Location,
    ) {
        this.rocks = input.split("\n").map((rock) =>
            rock.split(" -> ").map((r) => {
                const [x, y] = r.split(",");

                return { x: +x, y: +y };
            }),
        );

        this.setPouringSpot(pouringSpot);
    }

    private updateBounds(pos: Location) {
        this.minPos.x = Math.min(this.minPos.x, pos.x);
        this.minPos.y = Math.min(this.minPos.y, pos.y);

        this.maxPos.x = Math.max(this.maxPos.x, pos.x);
        this.maxPos.y = Math.max(this.maxPos.y, pos.y);
    }

    private ensureGridElement(
        x: number,
        y: number,
        value = ".",
        updateBounds = true,
    ) {
        if (this.grid[y] === undefined) {
            this.grid[y] = [];
        }

        if (this.grid[y][x] === undefined) {
            this.grid[y][x] = value;
        }

        updateBounds && this.updateBounds({ x, y });
    }

    private getDistanceVector(
        currentSpot: Location,
        nextCorner: Location,
    ): Location {
        return {
            x: nextCorner.x - currentSpot.x,
            y: nextCorner.y - currentSpot.y,
        };
    }

    private getAxis(direction: Location): keyof Location {
        return direction.x === 0 ? "y" : "x";
    }

    public generateRocks() {
        for (const rock of this.rocks) {
            for (let i = 1; i < rock.length; i++) {
                const currentCorner: Location = rock[i - 1];
                const nextCorner = rock[i];

                const direction = this.getDistanceVector(
                    currentCorner,
                    nextCorner,
                );
                const axis = this.getAxis(direction);

                while (currentCorner[axis] !== nextCorner[axis]) {
                    this.ensureGridElement(
                        currentCorner.x,
                        currentCorner.y,
                        "#",
                    );

                    currentCorner[axis] += Math.sign(direction[axis]);
                }

                this.ensureGridElement(currentCorner.x, currentCorner.y, "#");
            }
        }
    }

    public fillInAir() {
        for (let y = this.minPos.y; y <= this.maxPos.y; y++) {
            for (let x = this.minPos.x; x <= this.maxPos.x; x++) {
                this.ensureGridElement(x, y, ".", false);
            }
        }
    }

    // Part 2
    public addFloor() {
        this.grid.push(this.grid[this.grid.length - 1].map(() => "."));
        this.grid.push(this.grid[this.grid.length - 1].map(() => "#"));

        this.maxPos.y += 2;
    }

    public setPouringSpot(pos: Location) {
        this.ensureGridElement(pos.x, pos.y, "+");
    }

    public getGrid() {
        return this.grid;
    }

    public getGridString() {
        let result = "";

        for (let y = this.minPos.y; y <= this.maxPos.y; y++) {
            result += "\n";
            for (let x = this.minPos.x; x <= this.maxPos.x; x++) {
                result += this.grid[y][x] || " ";
            }
        }

        return result;
    }

    public getRocks() {
        return this.rocks;
    }

    private getNextSandSpot(location: Location) {
        const { x, y } = location;

        for (const direction of this.directions) {
            const nextSpot = { x: x + direction.x, y: y + direction.y };

            // Part 2
            if (nextSpot.y === this.maxPos.y - 1) {
                this.grid[this.maxPos.y][nextSpot.x] = "#";
                this.grid[this.maxPos.y][nextSpot.x - 1] = "#";
                this.grid[this.maxPos.y][nextSpot.x + 1] = "#";
            }

            this.ensureGridElement(nextSpot.x, nextSpot.y);

            if (AIR_CHARS.includes(this.grid[nextSpot.y][nextSpot.x])) {
                return nextSpot;
            }
        }

        return null;
    }

    public simulate() {
        const entry = this.pouringSpot;

        const queue: Location[] = [entry];

        while (queue.length > 0) {
            const current = queue.pop()!;

            if (current.y === this.maxPos.y) {
                this.grid[current.y][current.x] = "~";
                return current;
            }

            const nextSandSpot = this.getNextSandSpot(current);

            if (nextSandSpot) {
                this.grid[current.y][current.x] = ",";
                queue.unshift(nextSandSpot);
            } else {
                this.grid[current.y][current.x] = "o";
                this.unitsAtRest++;

                // Part 2
                if (current.y === entry.y && current.x === entry.x) {
                    return current;
                }

                // Emit a new sand unit
                queue.unshift(entry);
            }
        }
    }
}

export const regolithReservoir = (input: string) => {
    const simulation = new RegolithReservoir(input, { x: 500, y: 0 });

    simulation.generateRocks();

    simulation.fillInAir();

    // Part 2
    simulation.addFloor();

    const result = simulation.simulate();

    // console.log(simulation.getRocks());
    // console.log(simulation.getGrid());
    console.log(simulation.getGridString());

    Deno.writeTextFileSync(
        "./src/2022/day-14/output-14.txt",
        simulation.getGridString(),
    );

    console.log(result);

    return simulation.unitsAtRest;
};

console.time("regolithReservoir");
console.log(
    regolithReservoir(
        await Deno.readTextFile("./src/2022/day-14/input-14.txt"),
    ),
);
console.timeEnd("regolithReservoir");
