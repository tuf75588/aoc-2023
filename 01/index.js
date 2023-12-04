const fs = require("fs");
const path = require("path");

function partOne(file) {
  const lines = fs.readFileSync(file, 'utf-8').trim().split('\n');
  const values = lines.map((line) => {
    let first = line.split('').find((v) => !Number.isNaN(Number(v)));
    let last = line.split('').findLast((b) => !Number.isNaN(Number(b)));
    return Number(first + last);
  })
  return values.reduce((a,c) => {
    return a + c;
  });
}

console.log(partOne('./input.txt')); // 55017
/* PART 2 */

let legend = {
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


function partTwo(file) {
  console.log(file);
}