import fs from 'fs';

function partOne(file) {
  const lines = fs.readFileSync(file, 'utf-8').trim().split('\n');

  /* steps */
  // find the occurence of the first period character
  // find out if the next line has an integer <= the index of the dot on the upper line
  // if so, add to part list
  // if not, continue
  //

  const getNumbers = (lines) => {
    return lines.map((line, rowIdx) => {
      return line.split('').map((char, colIdx) => {
        return {
          char, 
          rowIdx,
          colIdx
        }
      })
    });
  };
  return getNumbers(lines);
}

console.log(partOne('./example-input.txt'));
