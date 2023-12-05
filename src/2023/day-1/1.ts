import { iterateFileLines } from "src/utils/iterateFileLines";

const isNumber = (char: string) => char >= "0" && char <= "9";
const wordsMap: Record<string, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};
const words = Object.keys(wordsMap);

const findFirstWord = (str: string) => {
  let minIndex = Infinity;
  let word = "";

  for (const w of words) {
    const i = str.indexOf(w);
    if (i !== -1 && i < minIndex) {
      minIndex = i;
      word = w;
    }
  }

  return { word, minIndex };
};

const findFirstNumber = (str: string) => {
  let minIndex = Infinity;
  let number = "";

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (isNumber(char) && i < minIndex) {
      minIndex = i;
      number = char;
    }
  }

  return minIndex;
};

const findLastWord = (str: string) => {
  let maxIndex = -Infinity;
  let word = "";

  for (const w of words) {
    const i = str.lastIndexOf(w);
    if (i !== -1 && i > maxIndex) {
      maxIndex = i;
      word = w;
    }
  }

  return { word, maxIndex };
};

const findLastNumber = (str: string) => {
  let maxIndex = -Infinity;
  let number = "";

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (isNumber(char) && i > maxIndex) {
      maxIndex = i;
      number = char;
    }
  }

  return maxIndex;
};

let sum = 0;

for await (const line of iterateFileLines(`${import.meta.dir}/input-1.txt`)) {
  const str = line.join("");
  let number = "";

  let { word, minIndex } = findFirstWord(str);
  const numIndex = findFirstNumber(str);

  if (minIndex < numIndex) {
    number += wordsMap[word];
  } else {
    number += str[numIndex];
  }

  let { word: lastWord, maxIndex } = findLastWord(str);
  const lastIndex = findLastNumber(str);

  if (maxIndex > lastIndex) {
    number += wordsMap[lastWord];
  } else {
    number += str[lastIndex];
  }

  sum += Number(number);
}

console.log(sum);
