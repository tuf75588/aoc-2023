const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.resolve(__dirname, './input.txt'), {
    encoding: 'utf-8',
  });
const numbers = data.trim().split('\n').map((x) => x.split(' '));



function extractAndConvertNumbers(element) {
    const numericString = element.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    const firstNumber = numericString.charAt(0);
    const lastNumber = numericString.charAt(numericString.length - 1);
    console.log({firstNumber, lastNumber})
    return [parseInt(firstNumber, 10), parseInt(lastNumber, 10)]; // Convert first and last digits to integers
}

const resultArray = numbers.map(innerArray =>
    innerArray.map(extractAndConvertNumbers).join(',')
).flat();

const sums = resultArray.map((element) => {
    const concatenatedNumber = element.replace(',', '');
    return parseInt(concatenatedNumber, 10);
});


console.log(sums);

let total = 0;

for (const sum of sums) {
    total += sum;  // 55017
}


/* PART 2 */