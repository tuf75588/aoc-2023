import fs from "fs";

function addArray(array) {
  return array.reduce((a, b) => a + b);
}

const getNumbers = (lines) => {
  return lines
    .map((line, rowIdx) => {
      return line.split("").map((char, colIdx) => {
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
        if (isNaN(Number(char))) {
          if (num) {
            results.push(num);
            num = null;
          }
          continue;
        }
        if (!num) {
          num = item;
        } else {
          num = {
            ...num,
            char: num.char + char,
          };
        }
        if (index === items.length - 1 && num) {
          // we found a part
          results.push(num);
        }
      }
      return results;
    });
};

function findAdjacentSymbol(lines, value) {
  const rowBeforeIndex = value.rowIdx - 1;
  const rowAfterIndex = value.rowIdx + 1;
  const colBeforeIndex = value.colIdx - 1;
  const columnAfterIndex = value.colIdx + value.char.length;

  for (let rowIdx = rowBeforeIndex; rowIdx <= rowAfterIndex; rowIdx++) {
    for (let colIdx = colBeforeIndex; colIdx <= columnAfterIndex; colIdx++) {
      const char = lines?.[rowIdx]?.[colIdx];
      if (!char) {
        continue;
      }
      if (!/[0-9]|\./.test(char)) {
        return true;
      }
    }
  }
  return false;
}

function partOne(file) {
  const lines = fs.readFileSync(file, "utf-8").trim().split("\n");
  const numbers = getNumbers(lines);
  const adjacentNumbers = numbers.filter((item) => {
    return findAdjacentSymbol(lines, item);
  });
  const ints = adjacentNumbers.map(({ char }) => parseInt(char, 10));
  return addArray(ints);
  /* steps */
  // find the occurence of the first period character
  // find out if the next line has an integer <= the index of the dot on the upper line
  // if so, add to part list
  // if not, continue
  //
}

function getGears(lines) {
  return lines
    .flatMap((chars, rowIdx) => {
      return chars.split("").map((char, colIdx) => {
        return { char, rowIdx, colIdx };
      });
    })
    .filter((item) => item.char === "*");
}

function getRatios(gears, numbers) {
  const results = [];

  for (const gear of gears) {
    // destructure
    const { rowIdx: gearRowIndex, colIdx: gearColumnIndex } = gear;
    const rowBeforeGear = gearRowIndex - 1;
    const rowAfterGear = gearRowIndex + 1;
    const colBeforeGear = gearColumnIndex - 1;
    const columnsAfterGear = gearColumnIndex + 1;

    const adjacentNumbers = [];

    for (let rowIdx = rowBeforeGear; rowIdx <= rowAfterGear; rowIdx++) {
      for (let colIdx = colBeforeGear; colIdx <= columnsAfterGear; colIdx++) {
        for (const num of numbers) {
          if (num.rowIdx === rowIdx) {
            const start = num.colIdx;
            const end = num.colIdx + num.char.length - 1;

            if (start <= colIdx && colIdx <= end) {
              if (!adjacentNumbers.includes(num)) {
                adjacentNumbers.push(num);
              }
            }
          }
        }
      }
    }
    if (adjacentNumbers.length === 2) {
      const [first, second] = adjacentNumbers.map((item) =>
        parseInt(item.char, 10)
      );
      results.push(first * second);
    }
  }
  return results;
}

function solution2(input) {
  const lines = fs.readFileSync(input, "utf-8").trim().split("\n");
  const numbers = getNumbers(lines);
  const gears = getGears(lines);
  const ratios = getRatios(gears, numbers);

  return addArray(ratios);
}

console.log(solution2("./input.txt")); // 83279367
