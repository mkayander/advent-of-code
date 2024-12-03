type Item = number | Item[];

const compareItems = (left: Item, right: Item): boolean => {
    if (right === undefined) {
        return false;
    }

    if (Array.isArray(left) && typeof right === "number") {
        right = [right];
    } else if (Array.isArray(right) && typeof left === "number") {
        left = [left];
    }

    if (Array.isArray(left) && Array.isArray(right)) {
        let i = 0;

        for (i; i < left.length; i++) {
            // if (right[i] === undefined) return false;
            if (left[i] === right[i]) continue;

            return compareItems(left[i], right[i]);
        }

        if (i <= right.length) {
            return true;
        }
    }

    if (typeof left === "number" && typeof right === "number") {
        return left < right;
    }

    return false;
};

export const distressSignal = (input: string) => {
    const pairs = input.split("\n\n").map((pair) => {
        const [left, right] = pair
            .split("\n")
            .map((line) => JSON.parse(line) as Item[]);
        return { left, right };
    });

    const rightOrderIndexes = new Set<number>();

    for (let i = 0; i < pairs.length; i++) {
        const { left, right } = pairs[i];

        const isCorrect = compareItems(left, right);

        console.log(i + 1, isCorrect, left, right);

        if (isCorrect) {
            rightOrderIndexes.add(i + 1);
        }
    }

    const indexesSum = [...rightOrderIndexes].reduce((sum, i) => sum + i, 0);

    console.log(rightOrderIndexes);

    return indexesSum;
};

console.time("distressSignal");
console.log(distressSignal(await Deno.readTextFile("./src/input-13.txt")));
console.timeEnd("distressSignal");
