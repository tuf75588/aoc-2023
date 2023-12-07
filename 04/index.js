import fs from 'fs';

function formatInput(file) {
   return fs.readFileSync(file, 'utf-8').trim().split('\n');
}


function compareArray(lines) {
  const games = formatInput(lines).map((item, index) => {
      const card = item.split(' | ');
      console.log({card});
  })
  return games;
}

console.log(compareArray('./example-input.txt'));