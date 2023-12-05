import { readFileSync } from 'fs';
import { resolve } from 'path';

const input: string = readFileSync(
  resolve(__dirname, '../input/input1.txt'),
  'utf-8'
);

console.log('Input:', input);

export const solution2 = () => {
  const lines = input.split('\r\n');

  const maps = lines.filter(
    (line) => line !== '' && !line.startsWith('seeds:')
  );

  const seedsRanges: number[] = lines
    .filter((line) => line.startsWith('seeds: '))[0]
    .split(':')[1]
    .trim()
    .split(' ')
    .map(Number);

  const allSeedsArr: number[][] = [];
  for (let numSeeds = 0; numSeeds < seedsRanges.length / 2; numSeeds++) {
    allSeedsArr[numSeeds] = [];
    allSeedsArr[numSeeds][0] = seedsRanges[numSeeds * 2];
    allSeedsArr[numSeeds][1] =
      seedsRanges[numSeeds * 2] + seedsRanges[numSeeds * 2 + 1];
    allSeedsArr[numSeeds][2] = seedsRanges[numSeeds * 2 + 1];
  }

  let mapname: string = '';
  const arrSeedSoil: number[][] = [];
  const arrSoilFert: number[][] = [];
  const arrFertWater: number[][] = [];
  const arrWaterLight: number[][] = [];
  const arrLightTemp: number[][] = [];
  const arrTempHumi: number[][] = [];
  const arrHumiLocation: number[][] = [];
  maps.forEach((map) => {
    if (map.endsWith(' map:')) {
      mapname = map;
    } else {
      switch (mapname) {
        case 'seed-to-soil map:':
          arrSeedSoil.push(map.split(' ').map(Number));
          break;
        case 'soil-to-fertilizer map:':
          arrSoilFert.push(map.split(' ').map(Number));
          break;
        case 'fertilizer-to-water map:':
          arrFertWater.push(map.split(' ').map(Number));
          break;
        case 'water-to-light map:':
          arrWaterLight.push(map.split(' ').map(Number));
          break;
        case 'light-to-temperature map:':
          arrLightTemp.push(map.split(' ').map(Number));
          break;
        case 'temperature-to-humidity map:':
          arrTempHumi.push(map.split(' ').map(Number));
          break;
        case 'humidity-to-location map:':
          arrHumiLocation.push(map.split(' ').map(Number));
          break;
      }
    }
  });

  let minResult: number = 999999999999999;
  //allSeedsArr.sort((a, b) => a[0] - b[0]);
  allSeedsArr.forEach((seeds) => {
    console.log(seeds);
    for (let i = seeds[0]; i < seeds[1]; i = i + 1) {
      if (i % 1000000 == 0) {
        console.log(i, minResult);
      }
      let seed = i;

      let mapApply: number[][] = arrSeedSoil.filter(
        (mapApply) => mapApply[1] <= seed && mapApply[1] + mapApply[2] > seed
      );
      if (mapApply.length >= 1) {
        seed = seed - mapApply[0][1] + mapApply[0][0];
      }
      mapApply = arrSoilFert.filter(
        (mapApply) => mapApply[1] <= seed && mapApply[1] + mapApply[2] > seed
      );
      if (mapApply.length >= 1) {
        seed = seed - mapApply[0][1] + mapApply[0][0];
      }
      mapApply = arrFertWater.filter(
        (mapApply) => mapApply[1] <= seed && mapApply[1] + mapApply[2] > seed
      );
      if (mapApply.length >= 1) {
        seed = seed - mapApply[0][1] + mapApply[0][0];
      }
      mapApply = arrWaterLight.filter(
        (mapApply) => mapApply[1] <= seed && mapApply[1] + mapApply[2] > seed
      );
      if (mapApply.length >= 1) {
        seed = seed - mapApply[0][1] + mapApply[0][0];
      }
      mapApply = arrLightTemp.filter(
        (mapApply) => mapApply[1] <= seed && mapApply[1] + mapApply[2] > seed
      );
      if (mapApply.length >= 1) {
        seed = seed - mapApply[0][1] + mapApply[0][0];
      }
      mapApply = arrTempHumi.filter(
        (mapApply) => mapApply[1] <= seed && mapApply[1] + mapApply[2] > seed
      );
      if (mapApply.length >= 1) {
        seed = seed - mapApply[0][1] + mapApply[0][0];
      }
      mapApply = arrHumiLocation.filter(
        (mapApply) => mapApply[1] <= seed && mapApply[1] + mapApply[2] > seed
      );
      if (mapApply.length >= 1) {
        seed = seed - mapApply[0][1] + mapApply[0][0];
      }

      if (seed < minResult) {
        minResult = seed;
        console.log(i, minResult);
      }
    }
  });
  console.log('Result', minResult);
};
