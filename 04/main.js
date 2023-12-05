const mainInput = require('fs').readFileSync('input.txt', 'utf8').split('\n').filter(item => item != '');
const testInput = require('fs').readFileSync('input-test.txt', 'utf8').split('\n').filter(item => item != '');

const input =  mainInput;

// const sum = input.map(line => {
//   const [_, numbers] = line.split(':');
//   const [winnerNumbersString, myNumbersString] = numbers.split('|');

//   const winnerNumbers = winnerNumbersString.trim().split(' ');
//   const myNumbers = myNumbersString.trim().split(' ').filter(item => item != '');

//   const multiply = myNumbers.map(number => {
//     return winnerNumbers.includes(number);
//   }).filter(item => item === true).length;

//   return Math.floor(Math.pow(2, multiply - 1));
// }).reduce((acc, cur) => acc + cur, 0);

// console.log(sum);


const cards = [];
const rewards = [];

input.map(line => {
  const [cardId, numbers] = line.split(':');
  
  const id = Number(cardId.trim().split(' ')[1]);
  const [winnerNumbersString, myNumbersString] = numbers.split('|');

  const winnerNumbers = winnerNumbersString
    .trim().split(' ').filter(item => item != '').map(item => Number(item));
  const myNumbers = myNumbersString
    .trim().split(' ').filter(item => item != '').map(item => Number(item));

  let matches = 0;
  for(let number of myNumbers) {
    if(winnerNumbers.includes(number)) matches++;
  }

  rewards.push(matches);
  cards.push(1);
});

for(let i = 0; i < cards.length; i++) {
  for(let j = 1; j <= rewards[i]; j++) {
    cards[i + j] += cards[i];
  }
}

const sum = cards.reduce((acc, cur) => acc + cur, 0);
console.log(sum);
