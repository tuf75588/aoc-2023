const fs = require('fs');

const data = fs.readFileSync('./input.txt', 'utf-8');

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

function getRaces(times, distances) {
  const races = [];
  while (times.length && distances.length) {
    const time = times.shift();
    const distance = distances.shift();
    races.push({ time, distance });
  }
  return races;
}

function getRaceResults(race) {
  const results = [];

  for (let i = 0; i <= race.time; i++) {
    const speed = i * 1;
    const time = race.time - i;
    const distance = speed * time;
    results.push({ distance });
  }
  return results;
}

function solution1(input) {
  const [timesLine, distancesLine] = data.trim().split('\n');
  const { times, distances } = getTimesAndDistances(timesLine, distancesLine);
  const races = getRaces(times, distances);

  const wins = races.map(
    (race) =>
      getRaceResults(race).filter((result) => result.distance > race.distance)
        .length
  );
  return wins.reduce((a,b) => a * b);
}

console.log(solution1(data));


function solution2(input) {
  
}