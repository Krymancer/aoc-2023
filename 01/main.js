const input = require('fs').readFileSync('input.txt', 'utf8').split('\n');

const words = {
  "eight": 8,
  "three": 3,
  "seven": 7,
  "nine": 9,
  "five": 5,
  "four": 4,
  "one": 1,
  "two": 2,
  "six": 6,
};

let testIutput = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

testIutput = testIutput.split('\n');

function isCharNumber(c) {
  return typeof c === 'string' && c.length == 1 && c >= '0' && c <= '9';
}

const sum = input
  .map((line) => {
    let fd;
    let fdidx = Infinity;
    let sd;
    let sdidx = -Infinity;

    for (let j = 0; j < Math.max(line.length - 5, line.length); j++) {
      for (let i = j + Math.min(5, line.length); i > 2; i--) {
        let firstDigit = line.slice(j, i);
        if (words[firstDigit] !== undefined) {
          fd = firstDigit;
          fdidx = j;
          break;
        }
      }
      if (fd !== undefined) {
        break;
      }
    }

    for(let i = 0; i < line.length; i++) {
      if(isCharNumber(line[i])) {
        if(i < fdidx) {
          fd = line[i];
          break;
        }
      }
    }


    for (let j = line.length; j > 0; j--) {
      for (let i = j; i > 0; i--) {
        let secondDigit = line.slice(i, j);
        let a = Object.keys(words).map((word) => { if (secondDigit.includes(word)) return word}).filter((word) => word !== undefined);
        if (a.length > 0) {
          sd = words[a[0]];
          sdidx = i;
          break;
        }
      }
      if (sd !== undefined) {
        break;
      }
    }

    for(let i = line.length -1; i >= 0; i--) {
      if(isCharNumber(line[i])) {
        if(i > sdidx) {
          sd = line[i];
          break;
        }
      }
    }
  
    console.log(fd, sd)
    return `${fd}${sd}`
  })
  .map((line) => {
    return Object.keys(words).reduce((acc, word) => {
      return acc.replace(word, words[word]);
    }, line);
  })
  .map((line) => {
    return line.replace(/[^0-9]/g, '');
  })
  .map((line) => {

    let firstDigit = line[0];
    let lastDigit = line[line.length - 1];

    if (lastDigit === undefined) {
      return parseInt(firstDigit);
    } else {
      return parseInt(firstDigit + lastDigit);
    }
  })
  .reduce((acc, cur) => {
    return acc + cur;
  });

console.log(sum);