const mainInput = require('fs').readFileSync('input.txt', 'utf8').split('\n');
const testInput = require('fs').readFileSync('test-input.txt', 'utf8').split('\n');
const testInput2 = require('fs').readFileSync('test-input-2.txt', 'utf8').split('\n');

const input = mainInput;

function isCharNumber(char) {
  return typeof char === 'string' && char >= '0' && char <= '9';
}

function isSymbol(char) {
  return !isCharNumber(char) && char !== '.' && char !== null;
}

const grid = input.map(row => row.split(''));

const cols = grid[0].length;
const rows = grid.length;

// const partNumbers = [];
//
// for(let i = 0; i < rows; i ++ ) {
//   for(let j = 0; j < cols; j ++ ) {
//     // Check if the cell is a symbol
//     if(isSymbol(grid[i][j])) {

//       // Check adjacent cells
//       for(let k = i-1; k <= i+1; k ++) {
//         // Check if the row is out of bounds
//         if(k < 0 || k >= rows) {
//           continue;
//         }

//         for(let l = j-1; l <= j+1; l ++) {
//           // Check if the column is out of bounds
//           if(l < 0 || l >= cols) {
//             continue;
//           } 

          
//           const cell = grid[k][l];

//           // Check if the cell is a number
//           if(isCharNumber(cell)) {

//             // search for the start of the number
//             let start = l;
//             while(isCharNumber(grid[k][start - 1])) {
//               start --;
//             }

//             // search for the end of the number
//             let end = l;
//             while(isCharNumber(grid[k][end + 1])) {
//               end ++;
//             }

//             // get the number
//             const number = grid[k].slice(start, end + 1).join('');
//             partNumbers.push(number);

//             // marke the cells as visited so we don't count the number twice
//             for(let m = start; m <= end; m ++) {
//               grid[k][m] = null;
//             }
//           }
//         }
//       }
//     }
//   }
// }
// const sum = partNumbers.reduce((acc, curr) => acc + Number(curr), 0);
// console.log(sum);

const gears = [];

for(let i = 0; i < rows; i ++ ) {
  for(let j = 0; j < cols; j ++ ) {
    let adjacentsNumbers = [];

    // Check if the cell is a symbol
    if(grid[i][j] == '*') {

      // Check adjacent cells
      for(let k = i-1; k <= i+1; k ++) {
        // Check if the row is out of bounds
        if(k < 0 || k >= rows) {
          continue;
        }

        for(let l = j-1; l <= j+1; l ++) {
          // Check if the column is out of bounds
          if(l < 0 || l >= cols) {
            continue;
          } 

          
          const cell = grid[k][l];

          // Check if the cell is a number
          if(isCharNumber(cell)) {

            // search for the start of the number
            let start = l;
            while(isCharNumber(grid[k][start - 1])) {
              start --;
            }

            // search for the end of the number
            let end = l;
            while(isCharNumber(grid[k][end + 1])) {
              end ++;
            }

            // get the number
            const number = grid[k].slice(start, end + 1).join('');
            adjacentsNumbers.push(number);

            // marke the cells as visited so we don't count the number twice
            for(let m = start; m <= end; m ++) {
              grid[k][m] = null;
            }
          }
        }
      }

      if(adjacentsNumbers.length == 2) {
        gears.push(adjacentsNumbers.reduce((acc, curr) => acc * Number(curr), 1));
      }
    }
  }
}
const mul = gears.reduce((acc, curr) => acc + curr, 0);
console.log(mul);