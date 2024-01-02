const fs = require('fs');

const data = fs.readFileSync('./example-input.txt', 'utf-8');

function getTimesAndDistances(timesLine, distancesLine) {
  const times = timesLine
    .replace(/Time:\s+/, '')
    .split(' ')
    .filter(Boolean)
    .map(Number);

  const distances = distancesLine
    .replace(/Distance:\s+/, '')
    .split(' ')
    .filter(Boolean)
    .map(Number);

  return { times, distances };
}
