// The Elf would first like to know which games would have been possible if the bag contained only 12 red cubes, 13 green cubes, and 14 blue cubes?
const fs = require('fs');

const maxCount = {
  red: 12,
  green: 13,
  blue: 14,
};

function partOne(file) {
  let games = fs.readFileSync(file, 'utf-8').split('\n');
  let sets = games
    .map((a) => {
      return a
        .split(': ')[1]
        .split('; ')
        .map((set) => {
          const pulls = set.split(', ');
          return pulls.every((pull) => {
            const [count, color] = pull.split(' ');
            return maxCount[color] >= Number(count);
          });
        })
        .every((p) => p);
    })
    .reduce((sum, result, i) => {
      return result ? sum + (i + 1) : sum;
    }, 0);
  return sets;
}

// console.log(partOne('./input.txt'));

/* PART TWO */

function partTwo(file) {
  let games = fs.readFileSync(file, 'utf-8').split('\n');
  return games.map((a) => {
    const maxCountPartTwo = {
      red: 0,
      green: 0,
      blue: 0,
    };
    a.split(': ')[1]
      .split('; ')
      .forEach((set) => {
        const pulls = set.split(', ');
        return pulls.forEach((amount) => {
          const [amt, color] = amount.split(' ');
          if (maxCountPartTwo[color] < Number(amt)) {
            maxCountPartTwo[color] = Number(amt);
          }
        });
      });
    return maxCountPartTwo.blue * maxCountPartTwo.green * maxCountPartTwo.red;
  }).reduce((a,b) => a + b);
}

console.log(partTwo('./input.txt'));
