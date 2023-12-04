const fs = require("fs");
const path = require("path");

const data = fs.readFileSync(path.resolve(__dirname, "./input.txt"), {
  encoding: "utf-8",
});
const numbers = data
  .trim()
  .split("\n")
  .map((x) => x.split(""));

console.log(numbers);
function extractAndConvertNumbers(element) {
  // check at what position the numeric string is found at
  
  const numericString = element.replace(/[^0-9]/g, ""); // Remove non-numeric characters
  const firstNumber = numericString.charAt(0);
  const lastNumber = numericString.charAt(numericString.length - 1);
  return [parseInt(firstNumber, 10), parseInt(lastNumber, 10)]; // Convert first and last digits to integers
}

const resultArray = numbers
  .map((innerArray) => innerArray.map(extractAndConvertNumbers).join(","))
  .flat();

const sums = resultArray.map((element) => {
  const concatenatedNumber = element.replace(",", "");
  return parseInt(concatenatedNumber, 10);
});


let total = 0;

for (const sum of sums) {
  total += sum; // 55017
}

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
