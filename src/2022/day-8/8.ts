export const visibleGridTrees = (input: string) => {
    const grid = input.split("\n");

    const visibilityGrid = grid.map((row) => row.split("").map(() => "0"));

    const directions = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
    ];

    const isVisibleFromEdge = (row: number, col: number): [boolean, number] => {
        const entry = grid[row][col];

        let isVisible = false;

        const visibleTrees = [];

        for (const [rowDir, colDir] of directions) {
            let currentRow = row + rowDir;
            let currentCol = col + colDir;

            let edgeFound = true;

            let steps = 0;
            while (
                (grid[currentRow] && grid[currentRow][currentCol]) !== undefined
            ) {
                steps++;

                if (+grid[currentRow][currentCol] >= +entry) {
                    edgeFound = false;
                    break;
                }

                currentRow += rowDir;
                currentCol += colDir;
            }

            visibleTrees.push(steps);

            if (edgeFound) isVisible = true;
        }

        const scenicScore = visibleTrees.reduce((acc, val) => acc * val, 1);

        console.log(visibleTrees, scenicScore);

        return [isVisible, scenicScore];
    };

    let innerTreesVisible = 0;

    let maxScenicScore = 0;

    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            const [isVisible, scenicScore] = isVisibleFromEdge(row, col);
            maxScenicScore = Math.max(maxScenicScore, scenicScore);

            visibilityGrid[row][col] = `${scenicScore}.`;

            if (isVisible) {
                // visibilityGrid[row][col] = `${scenicScore}.`;
                innerTreesVisible++;
            }
        }
    }

    const outerTreesVisible = grid.length * 2 + grid[0].length * 2 - 4;

    const totalTreesVisible = innerTreesVisible + outerTreesVisible;

    console.log("Total trees visible:", totalTreesVisible);

    console.log(visibilityGrid.map((row) => row.join("")).join("\n"));

    return maxScenicScore;
};

console.time("visibleGridTrees");
console.log(visibleGridTrees(await Deno.readTextFile("./src/input-8.txt")));
console.timeEnd("visibleGridTrees");
