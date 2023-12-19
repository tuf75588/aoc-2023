import { readFileSync } from 'fs';

const data = readFileSync('./example-input.txt', 'utf-8');

function partOne(input) {
  let [seeds, ...maps] = input.trim().split('\n\n');
  return {
    seeds: seeds.split(': ').at(1).split(' ').map(Number),
    // maps: maps.map(Number),
  };
}

console.log(partOne(data));
