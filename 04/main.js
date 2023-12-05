const mainInput = require('fs').readFileSync('input.txt', 'utf8').split('\n');
const testInput = require('fs').readFileSync('input-test.txt', 'utf8').split('\n');

const input =  mainInput;

const sum = input.map(line => {
  const [_, numbers] = line.split(':');
  const [winnerNumbersString, myNumbersString] = numbers.split('|');

  const winnerNumbers = winnerNumbersString.trim().split(' ');
  const myNumbers = myNumbersString.trim().split(' ').filter(item => item != '');

  const multiply = myNumbers.map(number => {
    return winnerNumbers.includes(number);
  }).filter(item => item === true).length;

  return Math.floor(Math.pow(2, multiply - 1));
}).reduce((acc, cur) => acc + cur, 0);

console.log(sum);