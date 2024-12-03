const isLowerCase = (str: string) => str === str.toLowerCase();

export const solve = (input: string) => {
    const arr = input.split("\r\n");

    const LOWERCASE_OFFSET = -96;
    const UPPERCASE_OFFSET = -38;

    let placement = 0;
    let prevGroup = -1;
    let prevSet = new Set<string>();
    let prevMutual: string[] | null = [];

    let sum = 0;

    for (let i = 0; i < arr.length; i++) {
        placement++;

        const group = Math.floor(i / 3);
        console.log({ group });
        const rucksack = arr[i];

        const set = new Set(rucksack);

        if (group !== prevGroup) {
            prevSet = set;
            prevGroup = group;
            prevMutual = null;
            placement = 0;

            continue;
        }

        console.log({ placement });

        const mutual = [...prevSet].filter((x) => set.has(x));

        prevMutual = prevMutual
            ? [...prevMutual].filter((x) => mutual.includes(x))
            : mutual;

        if (placement === 2) {
            const [item] = prevMutual;

            sum += isLowerCase(item)
                ? item.charCodeAt(0) + LOWERCASE_OFFSET
                : item.charCodeAt(0) + UPPERCASE_OFFSET;

            console.log("🎉🎉🎉 - sum", { item, sum });
        }

        // const left = new Set(rucksack.slice(0, rucksack.length / 2));
        // const right = new Set(rucksack.slice(rucksack.length / 2));
        // const [mutual] = [...left].filter((x) => right.has(x));

        // sum += isLowerCase(mutual)
        //   ? mutual.charCodeAt(0) + LOWERCASE_OFFSET
        //   : mutual.charCodeAt(0) + UPPERCASE_OFFSET;

        console.log({ mutual, prevMutual });

        // for (let i = 0; i < rucksack.length; i++) {
        //   const j = i + rucksack.length / 2;

        // }
    }

    return sum;
};

console.log(solve(await Deno.readTextFile("./src/input-3.txt")));
