
export async function* iterateFileLines(path: string) {
  const file = Bun.file(path);
  const stream = file.stream();
  const decoder = new TextDecoder();

  let buffer: string[] = [];

  for await (const chunk of stream) {
    const str = decoder.decode(chunk);

    for (const char of str) {
      if (char === "\n") {
        yield buffer;
        buffer = [];
      } else {
        buffer.push(char);
      }
    }
  }

  if (buffer.length > 0) {
    yield buffer;
  }
}

export async function* iterateFileLineStrings(path: string) {
  for await (const line of iterateFileLines(path)) {
    yield line.join("");
  }
}
