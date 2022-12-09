export const calculateTailMovement = (input: string) => {
  const actions = input.split('\n');

  const map: string[][] = [['#']];

  const directions = {
    L: [0, -1],
    R: [0, 1],
    U: [-1, 0],
    D: [1, 0],
  } as const;

  let tailMarksCount = 1;

  const currentHead = [0, 0];
  const currentTail = [0, 0];
  const knotsChain = [
    currentHead,
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    currentTail,
  ];
  let rowBounds = [0, 0];
  let colBounds = [0, 0];

  const getDirection = (direction: string) => {
    if (direction in directions) {
      return directions[direction as keyof typeof directions];
    } else {
      throw new Error(`Invalid direction: ${direction}`);
    }
  };

  const getDistance = (
    head: number[],
    tail: number[],
    absolute = true
  ): number[] => {
    const [headRow, headCol] = head;
    const [tailRow, tailCol] = tail;

    const rowDiff = headRow - tailRow;
    const colDiff = headCol - tailCol;

    if (absolute) return [Math.abs(rowDiff), Math.abs(colDiff)];

    return [rowDiff, colDiff];
  };

  const isAdjacent = (head: number[], tail: number[]): boolean => {
    const [headRow, headCol] = head;
    const [tailRow, tailCol] = tail;

    const isOverlapping = headRow === tailRow && headCol === tailCol;

    const [rowDiff, colDiff] = getDistance(head, tail);

    const isAdjacent = rowDiff <= 1 && colDiff <= 1;

    return isOverlapping || isAdjacent;
  };

  const updateBounds = (row: number, col: number) => {
    rowBounds = [Math.min(rowBounds[0], row), Math.max(rowBounds[1], row)];
    colBounds = [Math.min(colBounds[0], col), Math.max(colBounds[1], col)];
  };

  const calculateChildMovement = (head: number[], tail: number[]) => {
    if (!isAdjacent(head, tail)) {
      const [rowDiff, colDiff] = getDistance(head, tail, false);

      if (rowDiff > 0) {
        tail[0]++;
      }

      if (rowDiff < 0) {
        tail[0]--;
      }

      if (colDiff > 0) {
        tail[1]++;
      }

      if (colDiff < 0) {
        tail[1]--;
      }

      ensureMapCell(tail[0], tail[1]);

      if (tail === currentTail) {
        if (map[tail[0]][tail[1]] === '.') {
          tailMarksCount++;
          map[tail[0]][tail[1]] = '#';
        }
      }
    }
  };

  const ensureMapCell = (row: number, col: number) => {
    if (!map[row]) map[row] = [];
    if (!map[row][col]) map[row][col] = '.';

    updateBounds(row, col);
  };

  for (const action of actions) {
    const [direction, distanceRaw] = action.split(' ');
    const distance = +distanceRaw;

    const [rowDir, colDir] = getDirection(direction);

    for (let i = 0; i < distance; i++) {
      currentHead[0] += rowDir;
      currentHead[1] += colDir;

      for (let j = 0; j < knotsChain.length - 1; j++) {
        calculateChildMovement(knotsChain[j], knotsChain[j + 1]);
      }
    }
  }

  for (let row = rowBounds[0]; row <= rowBounds[1]; row++) {
    for (let col = colBounds[0]; col <= colBounds[1]; col++) {
      ensureMapCell(row, col);
    }
  }

  // console.log(map.map((row) => row.join('')).join('\n'));
  console.log(map);
  return tailMarksCount;
};

console.time('calculateTailMovement');
console.log(
  calculateTailMovement(await Deno.readTextFile('./src/input-9.txt'))
);
console.timeEnd('calculateTailMovement');
