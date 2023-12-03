const input = require('fs').readFileSync('input.txt', 'utf8').split('\n');

// const bag = {
//   'red': 12,
//   'green': 13,
//   'blue': 14 
// };
//
// const sum = input.map((line) => {
//   const [gameId, gameData] = line.split(':');
//   const id = gameId.split(' ')[1];

//   const turns = gameData.split(';');

//   let ok = true;

//   turns.map((turn) => {
//     turn.split(',').map((cube) => {
//       const [count, color] = cube.trim().split(' ');
//       if(bag[color] < count) {
//         ok = false;
//         return;
//       }
//     });
//     if(!ok) return;
//   });

//   return  ok  ? parseInt(id) : 0;
// }).reduce((a, b) => a + b);

// console.log(sum)


const sum = input.map((line) => {
  const [gameId, gameData] = line.split(':');
  const turns = gameData.split(';');

  let bag = {
    'red': 0,
    'green': 0,
    'blue': 0
  };

  let powers = turns.map((turn) => {
    turn.split(',').map((cube) => {
      const [count, color] = cube.trim().split(' ');
      bag[color] = Math.max(bag[color], parseInt(count));
    });
  });


  return bag.red * bag.green * bag.blue;
}).reduce((a, b) => a + b);

console.log(sum)