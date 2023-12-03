const mainInput = require('fs').readFileSync('input.txt', 'utf8').split('\n');
const testInput = require('fs').readFileSync('test-input.txt', 'utf8').split('\n');
const testInput2 = require('fs').readFileSync('test-input-2.txt', 'utf8').split('\n');

const input = testInput2;

function isCharNumber(char) {
  return typeof char === 'string' && char >= '0' && char <= '9';
}

function isCharDot(char) {
  return char === '.';
}

function isSymbol(char) {
  return !(isCharNumber(char) || isCharDot(char)) && char !== null;
}

const grid = input.map(row => row.split(''));
const partNumbers = [];

const cols = grid[0].length;
const rows = grid.length;

for(let i = 0; i < rows; i ++ ) {
  for(let j = 0; j < cols; j ++ ) {
    // check if is a symbol
    // if is a symbol go to the adjacent cells and check if there is a number
    // if there is a number, check for the start of the number and the end of the number
    // make sure to mark if a number takes more than one adjancent cell to no count the number twice
    // save the number;

    // Check if the cell is a symbol
    if(isSymbol(grid[i][j])) {

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
            partNumbers.push(number);

            // marke the cells as visited so we don't count the number twice
            for(let m = start; m <= end; m ++) {
              grid[k][m] = null;
            }
          }
        }
      }
    }
  }
}

const sum = partNumbers.reduce((acc, curr) => acc + Number(curr), 0);
console.log(sum);
