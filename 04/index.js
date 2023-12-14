import fs from 'fs';

function formatInput(file) {
  return fs.readFileSync(file, 'utf-8').trim().split('\n');
}

function format(lines) {
  const games = formatInput(lines).map((line, lineIdx) => {
    const [cardNumber, numbers] = line.split(': ');

    const [winnersStr, yoursStr] = numbers.split(' | ');

    // formatting
    return {
      id: cardNumber.replace(/Card\s+/, ''),
      winners: new Set(winnersStr.split(' ').filter(Boolean).map(Number)),
      yours: new Set(yoursStr.split(' ').filter(Boolean).map(Number)),
    };
  });
  return games;
}

function intersection(...sets) {
  return sets.reduce((set1, set2) => {
    const results = new Set();

    for (const item of set2) {
      if (set1.has(item)) {
        results.add(item);
      }
    }
    return results;
  });
}

function findMatches({ winners, yours }) {
  return intersection(winners, yours);
}

function getWorth(set) {
  return set.size ? 2 ** (set.size - 1) : 0;
}


function solution1() {
  const scratchcards = format('./input.txt');
  const vals = scratchcards.map(findMatches).map(getWorth);
  return vals.reduce((a,b) => a  + b);
}


console.log(solution1());

function part2() {
  const scratchcards = format('./input.txt');
  const copyQuantitiesById = {};

  function processCard(card, cardIdx) {
    const matches = findMatches(card);
    if (!matches.size) return;
    let i = 0;
    for (i; i < matches.size; i++) {
      let nextIdx= cardIdx + 1 + i;
      let id = scratchcards[nextIdx].id;

      if (!copyQuantitiesById[id]) {
        copyQuantitiesById[id] = 0;
      }
      copyQuantitiesById[id]++;
    }
  }

  let cardIdx = 0;
  for (cardIdx; cardIdx < scratchcards.length; cardIdx++) {
    let original = scratchcards[cardIdx];
    let copies = copyQuantitiesById[original.id] ?? 0;
    let total = 1 + copies;

    for (let i = 0; i < total; i++) {
      processCard(original, cardIdx)
    }

  }
  return scratchcards.length + Object.values(copyQuantitiesById).reduce((a,b) => a + b);
}

console.log(part2())