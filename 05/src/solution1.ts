import { readFileSync } from 'fs';
import { resolve } from 'path';

const input: string = readFileSync(
  resolve(__dirname, '../input/input1.txt'),
  'utf-8'
);

console.log('Input:', input);

export const solution1 = () => {
  const result: number = 0;
  const lines = input.split('\r\n');

  const seeds: number[] = lines
    .filter((line) => line.startsWith('seeds: '))[0]
    .split(':')[1]
    .trim()
    .split(' ')
    .map(Number);

  const maps = lines.filter(
    (line) => line !== '' && !line.startsWith('seeds:')
  );

  const temp: number[] = [];
  maps.forEach((line, counter) => {
    if (line.endsWith('map:')) {
      if (counter > 0) {
        temp.forEach((value, ind) => (seeds[ind] = value));
        console.log(line, seeds);
      }
    } else {
      const map = line.split(' ').map(Number);
      const sourceStart = map[1];
      const destStart = map[0];
      const range = map[2];

      // console.log("sourceStart", sourceStart, "destStart", destStart, "range", range);
      // console.log("seeds before", seeds);

      seeds.forEach((seed, index) => {
        if (seed >= sourceStart && seed < sourceStart + range) {
          const diff = seed - sourceStart;
          temp[index] = diff + destStart;

          //  console.log("old:", seed, "new:",  diff + destStart, "diff", diff)
        }
      });
    }

    console.log('seeds after', seeds);
  });

  //Final Copy
  temp.forEach((value, ind) => (seeds[ind] = value));

  console.log('Result', seeds);
  console.log('Result', Math.min(...seeds));
  return result;
};
