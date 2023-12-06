const mainInput = require('fs').readFileSync('input.txt', 'utf8').split('\n').filter(item => item != '');
const testInput = require('fs').readFileSync('test-input.txt', 'utf8');

let input = testInput;

input = input.split("\n\n").map(item => item.split("\n"));

let [
  seeds,
  seedTosoilMap,
  soilTofertilizerMap,
  fertilizerTowaterMap,
  waterTolightMap,
  lightTotemperatureMap,
  temperatureTohumidityMap,
  humidityTolocationMap,
] = input;

seeds = seeds.map(item => item.split(':')).pop();

function parseMap(map) {
  return map.slice(1).map(item => item.split(' ')).map(item => item.map(item => parseInt(item)));
}

seedTosoilMap = parseMap(seedTosoilMap);
soilTofertilizerMap = parseMap(soilTofertilizerMap);
fertilizerTowaterMap = parseMap(fertilizerTowaterMap);
waterTolightMap = parseMap(waterTolightMap);
lightTotemperatureMap = parseMap(lightTotemperatureMap);
temperatureTohumidityMap = parseMap(temperatureTohumidityMap);
humidityTolocationMap = parseMap(humidityTolocationMap);


function findMapValue(map, key) {
  let mapped = map.map(line => {
    const [destination, source, range] = line;
    if(key < source || key > source + range) return key;
    const index = key - source;
    return destination + index;
  });

  mapped = [...new Set(mapped)];

  if (mapped.every(item => item === key)) return key;

  return mapped.find(item => item !== key);
}

const value = findMapValue(seedTosoilMap, 790);
console.log(value)



