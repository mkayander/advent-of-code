type DiskFile = {
    fullPath: string;
    type: "file";
    size: number;
};
type DiskDir = Omit<DiskFile, "type"> & {
    type: "dir";
    children: Record<string, DiskItem>;
};
type DiskItem = DiskFile | DiskDir;

const AVAILABLE_SPACE = 70000000;
const TARGET_UNUSED_SPACE = 30000000;

export const parseCommands = (input: string) => {
    const cliOutput = input.split("\n");

    const createDir = (path: string): DiskDir => ({
        fullPath: path,
        type: "dir",
        size: 0,
        children: {},
    });

    const rootDir: DiskDir = createDir("");

    let currentCommand: {
        command: string;
        arg: string;
    } | null = null;
    let currentDir = rootDir;

    const findDir = (path: string, currentDir: DiskDir = rootDir): DiskDir => {
        if (path === "/") return rootDir;
        if (path === "") throw new Error("Path is empty");

        const [dirName, ...rest] = path.split("/");
        let dir = currentDir.children[dirName];

        if (!dir) {
            console.warn(
                `Dir not found, creating a new one name '${path}' in '${currentDir.fullPath}'`,
            );

            if (path[1] === "/") throw new Error("Path is not relative");

            dir = createDir(`${currentDir.fullPath}/${dirName}`);
        }

        if (dir.type === "file") throw new Error("Not a dir");

        if (rest.length === 0) return dir;

        return findDir(rest.join("/"), dir);
    };

    const updateDirSizes = (dir: DiskDir, newSize: number) => {
        dir.size += newSize;

        if (dir.fullPath === "") {
            console.log("Found root dir, stopping");
            return;
        }

        const parentDirPath =
            dir.fullPath.split("/").slice(0, -1).join("/") || "/";

        const parentDir = findDir(parentDirPath);

        updateDirSizes(parentDir, newSize);
    };

    const buildDirsTress = () => {
        for (const line of cliOutput) {
            console.log("---", line);
            if (line[0] === "$") {
                const [, command, arg] = line.split(" ");

                currentCommand = { command, arg };

                switch (command) {
                    case "cd":
                        if (arg === "..") {
                            const parentDir =
                                currentDir.fullPath
                                    .split("/")
                                    .slice(0, -1)
                                    .join("/") || "/";

                            currentDir = findDir(parentDir);
                        } else if (arg === "/") {
                            currentDir = rootDir;
                        } else {
                            currentDir = findDir(arg, currentDir);
                        }
                        break;
                    case "ls":
                        break;
                    default:
                        console.error("Command not found", command);
                }
            } else {
                if (!currentCommand) {
                    console.error("No command found for line", line);
                    continue;
                }

                const { command, arg } = currentCommand;

                switch (command) {
                    case "cd":
                        console.error("cd: ", arg);
                        break;
                    case "ls": {
                        const [left, name] = line.split(" ");
                        const fullPath = currentDir.fullPath
                            ? `${currentDir.fullPath}/${name}`
                            : name;

                        if (left === "dir") {
                            currentDir.children[name] = {
                                fullPath,
                                type: "dir",
                                size: 0,
                                children: {},
                            };
                        } else {
                            const size = parseInt(left, 10);
                            currentDir.children[name] = {
                                fullPath,
                                type: "file",
                                size,
                            };

                            updateDirSizes(currentDir, size);
                        }

                        break;
                    }

                    default:
                        console.error("Command not found", command);
                }
            }
        }
    };

    buildDirsTress();

    let minimumDiff = Infinity;
    let dirToDelete: DiskDir | null = null;

    const countDirSizes = (dir: DiskDir, targetSize: number) => {
        if (dir.size === targetSize) {
            minimumDiff = 0;
            dirToDelete = dir;
            return;
        }

        if (dir.size > targetSize) {
            const currentDiff = dir.size - targetSize;
            if (currentDiff < minimumDiff) {
                minimumDiff = currentDiff;
                dirToDelete = dir;
            }
        }

        for (const child of Object.values(dir.children)) {
            if (child.type === "dir") countDirSizes(child, targetSize);
        }
    };

    console.log(rootDir);

    const totalUsedSpace = rootDir.size;
    const totalFreeSpace = AVAILABLE_SPACE - totalUsedSpace;
    const spaceToFree = TARGET_UNUSED_SPACE - totalFreeSpace;

    countDirSizes(rootDir, spaceToFree);

    console.log({ totalUsedSpace, totalFreeSpace, spaceToFree });

    console.log("dirToDelete: ", dirToDelete);

    return dirToDelete;
};

console.time("parseCommands");
console.log(parseCommands(await Deno.readTextFile("./src/input-7.txt")));
console.timeEnd("parseCommands");
