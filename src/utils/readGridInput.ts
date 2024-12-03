export async function readGridInput(path: string) {
    const file = Bun.file(path);
    const text = await file.text();

    return text.split("\n").map((line) => line.split(""));
}
