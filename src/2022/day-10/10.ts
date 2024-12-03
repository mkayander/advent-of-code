export const calcuateSignalStrenghts = (input: string) => {
    const commands = input.split("\n");

    const cycleLenghts = {
        noop: 1,
        addx: 2,
    };

    let x = 1;

    let cycle = 0;

    // const firstMark = 20;
    const firstMark = 40;
    const nextMark = 40;

    let currentMark = 0;

    const signalStrenghts = [];

    let currentOutput: string[] = [];
    const output: string[][] = [currentOutput];

    const getNewMarkCycleDiff = (): number | null => {
        if (currentMark === 0 && cycle >= firstMark) {
            currentMark = firstMark;
            return cycle - currentMark;
        } else if (cycle >= currentMark + nextMark) {
            currentMark += nextMark;
            return cycle - currentMark;
        }

        return null;
    };

    const isSpriteVisible = (cycle: number) => {
        console.log({ cycle, currentMark, x });
        const currentPointer = cycle - currentMark;
        if (currentPointer >= x && currentPointer <= x + 2) {
            return true;
        }

        return false;
    };

    const setCurrentPixel = (cycle: number) => {
        currentOutput[cycle] = isSpriteVisible(cycle) ? "#" : ".";
    };

    for (const command of commands) {
        const [action, value] = command.split(" ");

        const number = parseInt(value);

        console.log(command, { value, x, cycle });

        switch (action) {
            case "noop":
                cycle += cycleLenghts[action];
                setCurrentPixel(cycle);
                break;

            case "addx": {
                cycle += cycleLenghts[action];

                const diff = getNewMarkCycleDiff();

                if (diff !== null) {
                    signalStrenghts[currentMark] = currentMark * x;

                    currentOutput = [
                        ...currentOutput.splice(
                            currentOutput.length - diff,
                            diff,
                        ),
                    ];

                    output.push(currentOutput);
                }

                setCurrentPixel(cycle - 1);
                setCurrentPixel(cycle);

                x += number;

                break;
            }

            default:
                throw new Error(`Invalid action: ${action}`);
        }
    }

    let sum = 0;

    signalStrenghts.forEach((signalStrenght, index) => {
        if (signalStrenght) {
            console.log(index, signalStrenght);
            sum += signalStrenght;
        }
    });

    // console.log(signalStrenghts);

    console.log(output.map((x) => x.join("")).join("\n"));

    return sum;
};

console.time("calcuateSignalStrenghts");
console.log(
    calcuateSignalStrenghts(await Deno.readTextFile("./src/input-10.txt")),
);
console.timeEnd("calcuateSignalStrenghts");
