const fs = require('fs');
function partOne(file) {
  const lines = fs.readFileSync(file, 'utf-8').trim().split('\n');
  const values = lines.map((line) => {
    let first = line.split('').find((v) => !Number.isNaN(Number(v)));
    let last = line.split('').findLast((b) => !Number.isNaN(Number(b)));
    return Number(first + last);
  });
  return values.reduce((a, c) => {
    return a + c;
  });
}

// console.log(partOne('./input.txt')); // 55017
/* PART 2 */

let legend = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
};

const firstNumberWordsRegExp = new RegExp(
  ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'].join(
    '|'
  )
);

const lastNumberWordsRegExp = new RegExp(
  ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
    .join('|')
    .split('')
    .reverse()
    .join('')
);

function partTwo(file) {
  const lines = fs.readFileSync(file, 'utf-8').trim().split('\n');
  const values = lines.map((line) => {
    // first
    let firstNumberIndex = line
      .split('')
      .findIndex((c) => !Number.isNaN(Number(c)));
    let firstWordMatch = line.match(firstNumberWordsRegExp);
    let firstWordNumberIndex = firstWordMatch?.index;

    let firstNumber =
      firstNumberIndex !== -1
        ? firstWordMatch
          ? firstNumberIndex < firstWordNumberIndex
            ? line[firstNumberIndex]
            : legend[firstWordMatch[0]]
          : line[firstNumberIndex]
        : legend[firstWordMatch[0]];

    // last
    let lastNumberIndex = line
      .split('')
      .findLastIndex((c) => !Number.isNaN(Number(c)));
    let lastWordMatch = line
      .split('')
      .reverse()
      .join('')
      .match(lastNumberWordsRegExp);
    let lastWordNumberIndex = lastWordMatch
      ? line.length - 1 - lastWordMatch.index
      : null;
    let lastNumber =
      lastNumberIndex !== -1
        ? lastWordMatch
          ? lastNumberIndex > lastWordNumberIndex
            ? line[lastNumberIndex]
            : legend[lastWordMatch[0].split('').reverse().join('')]
          : line[lastNumberIndex]
        : legend[lastWordMatch[0].split('').reverse().join('')];

    return Number(firstNumber + lastNumber);
  });
  return values.reduce((s, v) => s + v);
}

console.log(partTwo('./input.txt'));
console.log(partTwo('./example-input.txt'));
