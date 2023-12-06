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
    return lines
      .map((line, rowIdx) => {
        return line.split('').map((char, colIdx) => {
          return {
            char,
            rowIdx,
            colIdx,
          };
        });
      })
      .flatMap((items) => {
        const results = [];
        let num = null;
        for (const [index, item] of items.entries()) {
          const { char } = item;

          if (!isNaN(Number(char))) {
            if (num) {
              results.push(num);
              num = null;
            }
            continue;
          }
        }
        return items;
      });
  };
  return getNumbers(lines);
}

partOne('./example-input.txt');
