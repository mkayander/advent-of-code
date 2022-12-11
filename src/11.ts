class Monkey {
  constructor(
    readonly number: number,
    public inspectionCount: number,
    public items: bigint[],
    readonly operation: (old: bigint) => bigint,
    readonly test: (item: bigint) => boolean,
    readonly division: bigint,
    readonly recipients: {
      true: number;
      false: number;
    }
  ) {}
}

const greatestCommonDivisor = (a: bigint, b: bigint): bigint => {
  let t = 0n;

  a < b && ((t = b), (b = a), (a = t)); // swap them if a < b

  t = a % b;

  return t ? greatestCommonDivisor(b, t) : b;
};

const leastCommonMultiple = (a: bigint, b: bigint): bigint => {
  return (a / greatestCommonDivisor(a, b)) * b;
};

let lcm = 1n;

class MonkeyThrowsCalculator {
  readonly monkeysMap: Monkey[] = [];
  readonly ROUNDS_COUNT = 10000;

  constructor(input: string) {
    const monkeysInput = input.split('\n\n');

    for (const input of monkeysInput) {
      const monkey = this.parseMonkeyInput(input);
      this.monkeysMap[monkey.number] = monkey;
    }
  }

  parseOperationFunction(operation: string): (old: bigint) => bigint {
    const source = operation.split(': ')[1].split(' ');
    const num = source.at(-1);
    const operator = source.at(-2);

    if (!num || !operator) throw new Error('Invalid operation');

    const getNumValue = (old: bigint) => {
      if (num === 'old') return old;
      return BigInt(parseInt(num));
    };

    switch (operator) {
      case '+':
        return (old: bigint) => old + getNumValue(old);
      case '*':
        return (old: bigint) => old * getNumValue(old);

      default:
        throw new Error('Unknown operator');
    }
  }

  parseTestFunction(test: string): (item: bigint) => boolean {
    const condition = test.split(': ')[1].split(' ');
    const num = condition.at(-1);

    if (!num) throw new Error('Invalid test');

    return (item: bigint) => item % BigInt(parseInt(num)) === 0n;
  }

  parseMonkeyInput(monkeyInput: string): Monkey {
    const lines = monkeyInput.split('\n');

    const trueTarget = lines[4].at(-1);
    const falseTarget = lines[5].at(-1);

    if (!trueTarget || !falseTarget) throw new Error('Invalid monkey input');

    const monkey = new Monkey(
      parseInt(lines[0].split(' ')[1][0]),
      0,
      lines[1]
        .split(': ')[1]
        .split(', ')
        .map((item) => BigInt(parseInt(item))),
      this.parseOperationFunction(lines[2]),
      this.parseTestFunction(lines[3]),
      BigInt(parseInt(lines[3].split(': ')[1].split(' ').at(-1) ?? '0')),
      {
        true: parseInt(trueTarget),
        false: parseInt(falseTarget),
      }
    );

    return monkey;
  }

  inspectMonkeyItems(monkey: Monkey) {
    for (const item of monkey.items) {
      let newWorryLevel = monkey.operation(item);

      // newWorryLevel = Math.floor(newWorryLevel / 3); PART 1
      newWorryLevel %= lcm;

      const target = monkey.test(newWorryLevel)
        ? monkey.recipients.true
        : monkey.recipients.false;

      this.monkeysMap[target].items.push(newWorryLevel);

      monkey.inspectionCount++;
    }

    monkey.items = [];
  }

  calculateMonkeyBusinessValue = (): number => {
    const inspectionCounts = this.monkeysMap.map(
      (monkey) => monkey.inspectionCount
    );
    inspectionCounts.sort((a, b) => a - b);

    console.log(inspectionCounts);

    return (
      inspectionCounts[inspectionCounts.length - 1] *
      inspectionCounts[inspectionCounts.length - 2]
    );
  };

  run() {
    for (const monkey of this.monkeysMap) {
      lcm = leastCommonMultiple(lcm, monkey.division);
      console.log('lcm: ', lcm);
    }

    for (let i = 0; i < this.ROUNDS_COUNT; i++) {
      for (const monkey of this.monkeysMap) {
        this.inspectMonkeyItems(monkey);
      }
    }

    const businessValue = this.calculateMonkeyBusinessValue();

    return businessValue;
  }
}

export const calculateMonkeyThrows = (input: string) => {
  const throwsCalculator = new MonkeyThrowsCalculator(input);

  return throwsCalculator.run();
};

console.time('calculateMonkeyThrows');
console.log(
  calculateMonkeyThrows(await Deno.readTextFile('./src/input-11.txt'))
);
console.timeEnd('calculateMonkeyThrows');
