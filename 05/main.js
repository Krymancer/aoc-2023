const mainInput = require('fs').readFileSync('input.txt', 'utf8');
const testInput = require('fs').readFileSync('test-input.txt', 'utf8');

let input = mainInput;

//input = input.split("\n\n").map(item => item.split("\n"));

// let [
//   seeds,
//   seedTosoilMap,
//   soilTofertilizerMap,
//   fertilizerTowaterMap,
//   waterTolightMap,
//   lightTotemperatureMap,
//   temperatureTohumidityMap,
//   humidityTolocationMap,
// ] = input;

// seeds = seeds.map(item => item.split(':')).pop().slice(1).pop().trim().split(' ').map(item => parseInt(item));

// function parseMap(map) {
//   return map.slice(1).map(item => item.split(' ')).map(item => item.map(item => parseInt(item)));
// }

// seedTosoilMap = parseMap(seedTosoilMap);
// soilTofertilizerMap = parseMap(soilTofertilizerMap);
// fertilizerTowaterMap = parseMap(fertilizerTowaterMap);
// waterTolightMap = parseMap(waterTolightMap);
// lightTotemperatureMap = parseMap(lightTotemperatureMap);
// temperatureTohumidityMap = parseMap(temperatureTohumidityMap);
// humidityTolocationMap = parseMap(humidityTolocationMap);

// maps = [
//   seedTosoilMap,
//   soilTofertilizerMap,
//   fertilizerTowaterMap,
//   waterTolightMap,
//   lightTotemperatureMap,
//   temperatureTohumidityMap,
//   humidityTolocationMap,
// ];

// function findMapValue(map, key) {
//   let mapped = map.map(line => {
//     const [destination, source, range] = line;
//     if(key < source || key > source + range) return key;
//     const index = key - source;
//     return destination + index;
//   });

//   mapped = [...new Set(mapped)];

//   if (mapped.every(item => item === key)) return key;

//   return mapped.find(item => item !== key);
// }

// function processSeedToLocation(seed) {
//   let soil = findMapValue(seedTosoilMap, seed);
//   let fertilizer = findMapValue(soilTofertilizerMap, soil);
//   let water = findMapValue(fertilizerTowaterMap, fertilizer);
//   let light = findMapValue(waterTolightMap, water);
//   let temperature = findMapValue(lightTotemperatureMap, light);
//   let humidity = findMapValue(temperatureTohumidityMap, temperature);
//   let location = findMapValue(humidityTolocationMap, humidity);

//   return location;
// }
// const result = seeds.map(seed => processSeedToLocation(seed));
// const min = Math.min(...result);

// console.log(min);

// Part 2

function parseAlmanac(input) {
  const lines = input.split('\n');

  const seeds = lines[0].split(':').pop().trim().split(' ').map(item => parseInt(item));
  const parsedSeeds = [];

  for(let i = 0; i < seeds.length; i+= 2) {
    const seed = {
      start: seeds[i],
      end: seeds[i] + seeds[i+1],
      range: seeds[i+1],
    }
    parsedSeeds.push(seed);
  }

  let mapsStrings = lines.slice(1).join('\n').trim().split('\n\n').map(x => x.split('\n').slice(1));

  const maps = mapsStrings.map(item => {
    return item.map(line => {
      const [destination, source, range] = line.split(' ').map(item => parseInt(item));
      return [destination, source, range]
    })
  }).map(item => item.sort((a,b) => a[1] - b[1]));

  return maps;
}

/**
 * We have ranges for the maps
 * We must try to combine the ranges, in order do minimize the number of comparations we need to do
 */
function combineRanges(range, overlap) {
  /**
   * We have a couple of secnarios
   * 
   * 1 - The range does not overlap
   * x1------x2               x1---------x2
   *           y1----------y2
   * 
   * 2 - Overlap after start
   * x1------------x2
   *          y1----------y2
   * 
   * 3 - Overlap range starts before
   *              x1------------x2
   *  y1----------------y2
   * 
   * 4 - Overlap contains the range
   *    x1-------x2
   * y1------------------y2
   */


}

const [inputs, ...blocks] = input.split("\n\n");
const parsedInputs = inputs.split(":")[1].split().map(Number);

const seeds = [];

for (let i = 0; i < parsedInputs.length; i += 2) {
    seeds.push([parsedInputs[i], parsedInputs[i] + parsedInputs[i + 1]]);
}

for (const block of blocks) {
    const ranges = [];
    const lines = block.split('\n').slice(1);
    for (const line of lines) {
        ranges.push(line.split(' ').map(Number));
    }
    const newSeeds = [];
    while (seeds.length > 0) {
        const [s, e] = seeds.pop();
        for (const [a, b, c] of ranges) {
            const os = Math.max(s, b);
            const oe = Math.min(e, b + c);
            if (os < oe) {
                newSeeds.push([os - b + a, oe - b + a]);
                if (os > s) {
                    seeds.push([s, os]);
                }
                if (e > oe) {
                    seeds.push([oe, e]);
                }
                break;
            }
        }
        if (newSeeds.length > 0) {
            seeds.push(...newSeeds);
        } else {
            seeds.push([s, e]);
        }
    }
}

const result = Math.min(...seeds.map(seed => seed[0]));
console.log(result);