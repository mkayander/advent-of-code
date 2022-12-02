const countScore = (input) => {
  const arr = input.split('\n');

  const map = {
    X: -1,
    Y: 0,
    Z: 1,
  };

  const scoresMap = {
    A: 1, // rock
    B: 2, // paper
    C: 3, // scissors
  };

  const variants = ['A', 'B', 'C'];

  let score = 0;

  for (const match of arr) {
    const [left, action] = match.split(' ');
    const actionCode = map[action];

    const index = variants.indexOf(left);

    let right;
    if (actionCode === 0) {
      right = left;
    } else if (actionCode === -1) {
      if (index === 0) {
        right = variants.at(-1);
      } else {
        right = variants[index - 1];
      }
    } else if (actionCode === 1) {
      if (index === variants.length - 1) {
        right = variants[0];
      } else {
        right = variants[index + 1];
      }
    }

    const diff = left.charCodeAt(0) - right.charCodeAt(0);

    if (diff === 0) {
      score += 3 + scoresMap[right];
      if (actionCode !== 0) console.error('should not be draw');
      continue;
    }

    const rightWins = diff === -1 || diff === 2;

    if (rightWins && actionCode !== 1) {
      console.error('should not be right wins');
    }

    if (actionCode === 1 && !rightWins) {
      console.error('should be right wins');
    }

    score += scoresMap[right] + (rightWins ? 6 : 0);

    // console.log({ left, action, right, diff, rightWins, score });
  }

  console.log(score);
};

countScore(
  `B Y
A Z
A Z
B Y
A Z
B X
A X
A Z
C X
A Z
C Y
B Y
C X
C Y
B Y
C Y
C Y
C Z
A Z
B Y
B Y
A Z
B Z
C Y
C Y
B Y
B Y
C Y
B Z
C Z
C Z
B Z
C Z
C Y
B Y
C Z
C X
B Y
C Y
C Y
C Z
C Y
A Y
A Z
A Z
A Z
A X
A Z
A Z
C X
C Z
C Y
C Y
B Z
C Y
C Y
C X
C Z
C Y
A Z
C Y
A Y
A Z
B X
A Y
C Y
C Z
A Z
B X
C Z
C Y
C Y
C Y
C Y
B Y
A Z
C Y
A Z
A X
A Y
B Y
A X
A Y
B X
C Z
C Y
C Z
A Y
A X
C Y
B Z
A Z
A Z
A Z
C Y
A Z
B Y
A Z
B Y
B X
A Z
C Y
C Y
A Y
A Z
A Z
B Y
A Z
B Y
C Y
A Z
B Y
C Z
B Y
A Z
C Y
B Y
A Y
B X
A Z
B Y
B Y
B Y
B Y
B Y
C Y
C Y
A Z
C Y
B Y
B Y
C Y
B Y
A Z
C X
C Y
C X
A Z
C Y
C Y
C Z
C Z
A Z
C X
A Y
A Z
C Y
B Y
A X
B Y
A Z
C Z
A Z
C Y
B X
C X
A Z
C Z
A Z
B Y
C Y
B Y
C Y
B Y
A Z
C Y
C Y
A Z
A Y
A Z
A Z
C Y
C Z
B Y
C Y
B Y
C Y
B X
A Z
C Y
B Z
C Z
A Z
A Z
A Z
A Z
A Y
C Y
C Y
C Z
C Y
A Y
C Y
A Z
C Y
C Y
A Z
C Y
A Z
B Z
A Z
C Y
B Y
A Z
B Y
A Z
C Z
B Y
A Z
A Z
C Y
A Z
A Z
C Z
A Y
C Y
B X
A X
B Y
C Y
A Z
A Z
A X
A Z
B Y
A Z
C Y
B Y
A Z
A Z
B Z
A Z
B Y
C Z
C Y
B X
C Z
C X
C Y
A Y
A Z
A X
B Y
A Y
C Y
C Y
A Z
A Z
A Z
C Z
C Y
B Y
A Z
A Z
A Y
A Z
A Z
C Y
A Z
A Z
C X
A Z
B Z
C Z
A Z
B Y
A Z
B Y
C X
C Y
C Z
C Z
C X
A Z
C Y
A Z
C X
A Z
B Y
A X
B Z
A Z
A Z
C X
C Y
B Y
B Y
C Y
A Y
A Z
A Z
C Y
A Z
A X
C Z
A X
A X
A Z
A Z
C Y
A Z
C Y
A Z
C Y
A X
B Y
B Z
B Y
A Z
C Z
A Y
C Y
A Z
A Y
A Z
C Z
A X
A Z
A X
A Z
B Y
A X
A Z
C Y
A Z
B Y
C Y
C Y
C Y
C Y
A Z
B X
C Y
B Z
A Z
A Z
A Z
B Y
A Z
C X
C Y
B Y
C Y
A Z
C Y
C Z
A Z
A Z
C Y
C Y
C Y
C Y
A Z
A Z
B Y
A Z
C Y
C Z
C Y
B Y
B Z
C Y
B Y
A Z
B Y
B X
A Z
A X
C Y
A X
C Z
C Z
C X
C Y
C Y
A Z
C Y
A Z
C Y
C Z
B X
C Y
A Y
C Y
A Z
C Z
A Z
C Y
C Y
B Y
C Y
C Y
A Z
A Z
A Z
A Z
C Y
A X
A X
A Z
A Z
B Y
A Y
A Z
A Y
A Z
C Z
A Y
B Y
A Y
A Z
C Z
B X
A Z
C X
C Z
C Y
A Z
A Z
A Z
A Y
A Y
C Y
A Y
B X
C Y
A X
C Y
A Z
B Z
C Z
A Z
C Y
C Y
B Y
C Y
B Y
A Y
C X
A Y
C Y
A Y
C X
C Y
C Y
C Y
C Z
A X
A Z
C Z
A Z
C Z
A Z
C Y
C Z
C Y
C Y
C Y
A X
A Z
C X
C Y
A Z
A Z
A Z
C Y
C Y
C Y
A Y
A Z
C Y
A Z
C Y
C Y
C Y
A Z
B Y
C Y
A Z
C Y
A Y
C Y
A X
A Z
A Y
A Z
A Z
B X
B Y
A Z
A Z
B Y
C Z
A Z
A Y
A Z
B Z
B Y
A Y
C X
C Z
C Y
A Z
C Y
A Z
C Y
C Y
C Y
C Y
C Z
C X
A Z
C Y
A Z
C Y
C Y
A Z
C Y
A X
A Z
B Y
C Z
B Y
C Y
C Y
C Y
B Z
A Y
A Z
A Z
A Z
A Z
C Z
A Y
A Y
B Z
A Y
C Y
B X
B X
B Y
C Y
B X
C Y
A Z
A Z
A Y
C Y
C Y
C Y
C Y
C Y
B Y
A Z
C Y
A Z
A Z
B Z
C Y
B Y
B Z
A Y
C Y
B Z
C Y
C Y
A Z
C Y
A Z
A X
A Z
B Y
C Y
C Y
A Z
C Z
A Z
B Y
C Y
C Z
B X
B Y
A Z
A Z
A Z
C Z
C X
B Y
A Y
A Y
A Z
A Y
A Z
A Z
C Y
C Y
C Y
A Z
C Z
A Z
A Z
C Y
A Z
C Y
B Y
C Z
A Y
A Z
B Y
B Z
A Z
A Y
A Z
B X
A Z
A Y
C Y
C Y
B X
A Z
B Z
C Y
C Z
C Y
A X
A X
B X
A Z
C Y
C Y
B X
B Z
A Z
C Y
B Y
B Y
C Z
C Y
B Z
A Z
A Z
C X
A Z
A Z
A Z
A Y
B Z
B Z
A Y
A Y
C Y
A Z
A Z
A Z
B Y
C X
B Y
A Y
C Y
C Z
C Y
C X
C Y
C Y
C Y
A Y
C Y
A X
C Z
B Y
A Y
A Z
B Y
A Z
B Y
A Z
C Y
A Y
B Y
A Y
B Y
C Y
A Z
A Z
B X
C Y
A Y
A Y
B X
C Z
C Y
B Y
C Y
C Z
A Z
C Y
A Y
A Z
A Z
B X
C Y
C Z
C Y
C Z
A Z
C Y
C Z
A Y
C Y
C X
C Y
C Y
C Y
A X
A Y
C Z
B Y
A Z
C Z
C Y
A Z
B Y
C Y
A Z
A Z
A Z
C Z
A Y
A Z
C Y
A Z
C Z
A Z
A Z
C Z
A X
C Y
B Y
A Z
A X
A Z
A Z
B Y
A Z
C Y
C Z
C Y
C Y
B Z
C X
A Z
C Z
C Z
A Y
A Y
C Z
A Y
A Y
B X
A Z
A Z
A Z
B X
C Y
A Y
A Z
C Y
C Y
C X
C Z
A Z
B Y
B Z
A Y
C Y
C Y
B Y
A Z
C Y
A Z
A X
C Z
C Z
A Z
C Y
B Y
C Y
C Y
C Y
C Z
C Y
C Y
C Y
A Z
B Z
A Z
B X
A X
C Y
C Y
A Y
A Z
B Y
A Z
C Y
B Y
B X
B Y
A Z
C Z
C Y
B Y
C Y
C Y
C Z
C X
C Y
A Z
A Y
A Z
C Y
B Z
C Z
A X
C Y
A Y
C Y
A Z
A Y
B Y
A Z
A X
A X
B Y
A Z
C Y
A Z
C Y
C Y
C Z
C Y
A Z
A Z
B Z
B X
A Z
C Z
A Z
C Y
C Y
C Z
C Y
A Y
C Y
A Y
B Y
B Y
B Y
A Z
A X
C Y
C Y
B Y
A Y
A Z
A Y
B Y
A Y
A Y
C Y
A Z
C Z
A Z
C X
A Z
A Y
C Z
A Z
A Z
C Y
B Y
C Y
A Z
C Z
B Y
B Y
A Z
A Z
A X
A Z
C Z
C Y
A Z
A Z
A X
A Z
C Y
A X
C Y
C Y
A X
C Y
A Y
B X
C Y
B Y
B Y
C X
A Z
A Z
C Y
C Y
C Z
A X
A Z
B X
A Z
C Y
C Y
A Z
C Y
C Z
A Y
B Y
C Y
C X
A Z
A Y
A Y
C Y
A Z
B Z
A Y
C Y
A Z
C Y
C X
A Z
B X
B Y
C X
A Y
A Y
A Z
A Z
B X
A Z
A Y
A Z
C Y
A X
C Y
A Z
B Y
B Y
B Y
A Y
A Y
A X
C Z
C Z
B Y
A Y
A Y
C Y
A X
A Z
A X
B Y
A Z
A Z
A Y
A X
C Y
B X
A Z
A Z
A Z
A Z
C Z
A Z
A Z
A Y
B Y
A X
A Y
C Y
A X
B Y
A Z
A Z
C Y
B Y
B Y
A Z
C Y
C Y
B Y
B Y
C Y
B Y
B Y
B Y
A Z
B Y
B Y
B Y
A X
A Z
A Z
A Z
A Y
A Z
A Z
A Z
B Y
A X
C Z
A Z
A X
C Z
A Z
A Y
C Y
C Z
A X
C Z
A Y
B Y
C Z
A Z
C Y
B Y
B Y
B Z
C X
A Z
B Y
C Y
C Y
C X
A Z
A Z
A Y
C Y
B X
B X
A Y
A Z
C Y
C X
A Y
B Y
A Z
A Z
A Z
C Z
C Y
A Z
B Z
A Z
C Y
C Z
B X
A Z
A Y
B Y
C Y
C X
C Z
A Y
C Z
C Y
A Y
C Y
A X
C Y
A Z
C X
B Y
C Y
C Y
C Y
B Y
C X
A X
A Z
A Y
A Z
A Z
B X
C Z
A Z
A Z
A Z
C Y
C Y
C Y
C Y
A X
C Y
A Z
B Z
A Z
A X
A Z
A Y
B Y
A Z
A Y
C Y
C Y
A Z
A Z
B Y
A Z
C Y
C Z
A Y
B Y
B X
C Y
C Y
A Z
C X
B Y
A X
B Y
A Z
A Z
B Y
A Y
C X
A X
C X
A Z
C X
C Z
A X
C Y
C Z
C Y
A X
A Z
C Z
A Z
A Z
A Z
B Y
A Z
A Z
C Y
C Z
A Y
A X
A Z
B Z
C Y
C Z
C Y
B Y
A Z
B Z
C Y
A Z
C Y
C X
C Z
A Y
C X
B X
B Z
B Y
B X
B X
C Y
C Z
C Y
C Y
B Y
C Y
C Y
A Z
B Y
C Y
B Z
A Y
A Z
B Y
C Z
A Z
C Y
C Y
B Z
A Z
C Y
C Y
A Z
B X
B Y
B Y
C Y
A Z
A X
A Y
B X
A Y
C Y
A Z
A Z
B Z
C Y
C Y
A Y
B Z
C Y
A Z
A Y
B Y
C Z
B Y
B Z
C Y
A Z
C Y
C Y
A Z
C Y
C X
A Z
B Y
A X
C Y
C Y
B X
B Y
A Z
C Y
B Y
A Z
C Y
A Z
B Z
C Y
C Y
A Y
C Y
B X
A Z
C Y
C Z
C Y
A Z
C Y
C Y
C Y
A Z
B Y
C Y
C Z
A Z
A Y
C Y
C X
C Y
A Z
C Y
C Z
A Y
C X
A Z
C Z
C Y
A Z
C Z
C Z
B Y
A Z
C Y
A Z
B Z
A X
A Z
A Z
A Z
C Y
A Z
C Y
A Z
C Y
A Y
A Y
A Z
A X
A Y
B Z
C Y
C Z
A Z
B Z
C Y
B X
C Y
A Z
A Z
B Z
C X
C Y
C Y
C Y
B Z
B Y
A Z
C Y
A Y
C Z
B Y
C Y
A X
C Y
B Y
A Z
A Z
C X
C Y
A Z
C Y
C Y
C Y
A Y
C X
A Z
B Y
A Y
C Y
B Y
B Y
C Y
A Y
C Z
C Y
C Y
B Y
A Y
A X
C Z
B Z
A Z
C X
B Y
C Y
B Y
C Z
C Z
B Y
A Y
C Y
A Z
B Z
C Y
C Z
A Z
C Y
A X
A Z
C Y
C Z
A Y
C Y
A Z
C Y
C Z
B X
C Y
A X
C Y
C Y
A Z
A Z
C Y
A Z
A Z
C Y
C Z
A Z
B X
A Z
A Y
B Y
A X
A Z
C Z
C X
A Y
C Y
A Z
B Z
B X
C Y
C Y
A Y
B Y
A Y
C Y
C X
C Y
A Z
C Y
C Y
A Z
A Z
C Z
A Z
A Z
A Z
A Z
A X
C Y
B Z
B Y
A Z
C Y
C X
A Y
A Z
C X
A Z
C X
C Y
A Y
C X
C X
C Y
A Y
A Z
B Z
A Z
C Y
C X
C Y
B Z
C Y
A Z
C Y
C Y
A Z
A Z
B Y
A Z
C Y
B Y
A Z
C X
A Z
A Z
C Y
A Z
C Y
B X
B X
B Y
C Y
C Y
C Y
C X
B Y
B Y
A Z
A X
A Z
C X
B Y
C Y
B Y
C Y
C Y
C Y
C Y
B Y
A Y
C Y
B Z
B Y
A Z
A Z
C Y
C X
B Y
A Y
C Y
C Z
C Z
A Z
A Z
C Z
C Y
A X
A Z
C Y
C Y
A Z
A Y
C Y
A Z
C Y
C Y
A Z
A X
B Y
B X
A Z
C Z
C Y
B Y
B Y
A Z
B Y
A Z
A Y
A X
A X
B Y
C Y
C Y
C Y
A Y
B Z
A Z
A X
A Z
B Y
B Y
A Y
A X
C Z
B Y
A Z
A Z
C Y
A Z
C Y
C Y
C Y
B Y
A Y
B Y
A X
C Y
C Z
B Z
A Z
A Z
C Z
C X
A Z
C Z
B X
B Z
A Y
C Y
A Z
C Z
A Y
B Z
A Z
A Z
B Y
C Y
A Z
C Y
C Y
C Z
A Z
A Z
A Z
B Y
C Y
C Y
A Z
C Y
C Y
A Z
C Y
B Y
C Z
A Y
B Y
A X
A Y
B Y
A Z
C Z
A Z
C Y
C Y
A Z
C X
C Y
C Z
C Y
A Z
C Y
B Z
C Z
C Y
C Y
C Y
A Y
B Y
C Y
C Y
C Z
C Y
C X
B Y
A Z
C X
A Z
C Y
A Z
C Y
A Z
B Z
A Z
A Z
B Z
C Y
A Y
C Z
B X
B Y
C Y
A Z
B Z
A Z
C Y
A X
C Y
C Y
B Y
A Y
A Z
A Y
B Z
C Y
A Z
B Z
B X
A Z
C Z
B Y
A Z
A Z
C Y
A Z
C Y
C Y
A Z
C Y
C Z
A Y
C Y
A Z
C Z
A Z
B X
C Y
B X
A Y
C Y
A Z
B Y
C Y
A Y
A Z
A Z
B Y
C Y
A Z
A Z
A Z
A Z
A Y
C Y
C Z
B Y
A Z
C X
C Y
B Y
C Y
B Z
C Y
C Y
B Y
C X
C Y
C Y
B Y
A X
C Y
C Y
B Y
B Y
A Z
C Y
C Y
A Z
A Z
B Y
B X
C Y
A Y
A Z
C Y
B Y
A Z
B Y
A Y
B Z
C Y
B Y
A Z
C Y
C Y
B Z
C Y
A X
C Y
A Z
C Z
A Z
A Z
B Y
C Y
C Y
B Z
B X
C Y
C X
C Y
A Y
A Y
C Y
A Z
A X
A Z
A Z
A Z
B Y
C Z
A Y
A Y
C Z
A Y
A Z
B Z
A Z
C Y
C Y
B Y
C Y
B Z
A Z
C Y
C Y
A X
C Y
A Z
A X
C Y
C Y
A Z
C Y
A Z
A Z
A Z
B Y
B Y
B Z
C Y
B Y
B Y
B Y
C Y
B Z
A X
C Y
C Y
A Z
C Y
C Y
A Z
C Z
A Z
A Y
B Z
B Y
A Z
C Z
A Y
B Y
C Y
A Z
B Z
C Y
B Y
B Z
B Z
C Y
B X
B Y
C Y
A Y
A X
C Z
C Y
A Z
A Y
C Y
A Z
A Z
A Y
A Z
C Y
A Y
B Y
A Y
A Z
A Z
A Z
A Y
A Y
A Y
B Y
B Y
A Z
A X
B Y
A Y
A X
C Y
A Y
C Z
C X
C Z
C X
A Z
C Z
A Z
A X
C Y
C Z
A Y
A Z
C Y
A X
B Y
C Y
C Z
A X
C Y
A Z
B Y
B Y
C Z
A Y
C Z
A Z
C Y
A Z
C X
A X
B Y
C Y
B Z
B X
C Y
C Z
A Z
A Y
C Y
B Z
A Z
A Z
C Z
A Z
B Y
A Z
C Y
B Y
C Y
A Z
B Y
C Y
A Z
B Z
B X
C Z
C Y
A Y
C Z
A Z
A Z
C Y
C Y
A Z
C Y
A X
B Y
C Y
C Y
A Y
C Y
A Y
C Y
A Y
A Z
B Y
A Z
B Y
C Y
B Z
C Y
C Z
A Y
B Z
A Z
A Y
C Y
C Y
C Y
A Z
C Y
C X
C Y
A Z
C X
A Z
C Y
C Y
C Y
C Y
A Z
C Y
A Z
A Z
B Y
A Y
B X
A Y
C Y
C Z
A X
B Y
A Z
A Z
A Y
A Y
A Z
B X
A X
B Y
A Z
C Y
C Y
B Y
C Y
B X
A Z
B Y
B Y
A Z
A Z
A Z
C X
B Z
C Z
A X
A X
B Y
C Y
C Z
B Y
C Z
A Z
A Z
C Y
C Z
B Y
B Z
C Y
A X
A X
B Z
C Y
C Y
A Z
B Y
B Y
C Y
A Z
C Y
B Y
B Y
A Z
A Z
C Z
A Z
B Y
B Y
C Z
A X
B Y
C X
C Y
C Y
A X
B Y
B Z
A Z
B Y
B Z
A Z
C Y
C X
C Z
C X
A Z
A X
A Z
C Y
C Y
A Z
C Y
C Y
B Z
C Z
A Y
C Y
B Z
B Y
A Z
A X
C Y
A Z
C Y
B Z
A Z
A Z
A Z
C Y
A Z
C Z
C Y
A Z
B Y
C X
A Z
A Y
C Y
A Z
C Y
C Y
B Z
C Z
C Z
C Y
A Z
A Y
B Y
C Y
A Z
A X
A Y
A Z
A X
B X
B Y
B Z
A X
C Y
C Y
B X
A Z
A Z
A Y
B X
A Y
C Y
B Y
B Y
C Z
C Y
C Z
B X
B Z
C Y
A Z
A Z
B Z
A Z
A Z
C Y
B Y
A Z
A Y
A Z
A Y
A Y
B Z
A Z
C X
C Y
C Z
C Y
A Z
A Y
B Z
C X
B Y
A Z
A X
A Y
C Y
A Z
C Y
C Y
A Y
C Y
A Z
C X
C Y
C Y
C Y
C X
A Z
C Y
A Z
B Y
B Y
B X
C Y
B X
C Y
A Z
C X
B Y
C Y
A Z
C Y
C Y
C Y
A Y
B Z
C X
A Z
C Z
A Z
C Y
C Y
A X
C Y
C Y
C Y
A Y
C X
A Z
A Z
C Y
C Y
A Y
B Y
A Y
A Z
C Y
A Z
A Z
A Z
C X
C X
C Y
A Z
C Y
C Y
C Z
C Y
B Y
A Z
C Y
B Y
C Y
B X
A Z
A Z
C Y
A X
B Y
B Z
A Z
A Z
C X
A Z
B Y
A Z
A Z
A X
A Z
C Y
A Z
B Y
A X
A X
C Z
A X
B Y
A Z
A X
B X
C Y
C Z
C Y
B Y
A X
C X
A Z
A Z
A Z
C X
C X
A Z
B Y
A Z
A Z
C Y
B X
C X
B X
B Y
B Z
C Y
A Z
A Z
C Z
B Y
A Z
C Y
A Y
A Z
A X
C Y
C Y
B Z
B Y
B X
C X
A Z
B X
B Z
C Y
C Y
C Y
B Z
C Y
C Z
C Y
B Y
C Y
B Z
C Z
C Y
B X
A Z
B Y
C Y
B Z
C Y
C Z
A Z
C X
A Z
B Z
B Y
A Z
C X
C Y
B Y
B Z
C Y
B Z
B Z
C X
C Y
A Y
B Y
C Z
C X
C Y
C Y
A Z
C X
C Z
B Z
A X
B Y
B Y
B Y
C Z
B Y
C Y
A Z
C Y
C Y
A Z
C Z
C Y
C X
C Y
B X
B Y
B X
A Z
C X
C Z
B Z
A Y
C Y
A Z
C Y
C Y
C Y
B Y
C Y
B X
A Z
C Z
C Y
C Y
C Y
C Z
A Z
A Z
A Z
C Y
A Z
A Z
A Z
A Z
B X
C Y
C Z
B X
A Z
C Z
A Z
A Z
A Z
C Z
B Z
C Y
A Z
C Y
C Y
A Y
C Z
A Z
C Y
A Z
A X
A Y
C Y
A Z
C Y
B Y
A Z
A X
C Y
C Y
A Y
A Z
C Z
A X
C Y
A Z
C Y
C Z
A Z
C Y
C Z
A Z
B Y
A Z
B Y
B X
C Y
C Z
A X
A Z
A X
A Y
B Y
A Y
C Y
A Y
C Y
B Z
A Y
A X
C Y
C Z
A Z
A Z
C Z
C Y
C Y
A Y
A Y
C Y
C Y
C Z
A Y
C Y
A Z
B Z
B Y
B Y
A Z
A Z
B Y
A Z
C Y
C Y
C Z
B Y
A Z
A Y
A Z
A Z
A Y
A Z
A Z
A Z
C Y
A Z
A Z
C Y
B Z
B Y
C Z
C Y
A Y
B X
C Z
A Z
B Z
A Z
B Y
A Z
B Y
A Z
B Y
B Y
C Y
A Z
A Z
C Z
A Y
B Y
A Y
C Y
C Y
C Y
A Z
B Z
A Z
C Y
A Z
B Z
B Y
C Y
C Y
A Y
B Y
C Y
B Z
C Y
C Z
A X
C Y
B Z
B Z
A X
A X
C Y
C Y
C Y
A Y
A Z
A X
C Y`
);
