import { readFileSync } from 'fs';
import { resolve } from 'path';

const input: string = readFileSync(
  resolve(__dirname, '../input/input1.txt'),
  'utf-8'
);

const inputLines: Array<string> = input.split('\r\n');

console.log('Input:', input);

export const checkPossible = (line: string) => {
  let needRed: number = 0;
  let needGreen: number = 0;
  let needBlue: number = 0;

  const gameArr: string[] = line.split(':');
  const setArr: string[] = gameArr[1].split(';');

  setArr.forEach((set) => {
    const cubeArr: string[] = set.split(',');
    cubeArr.forEach((cube) => {
      const cubeCheck: string[] = cube.trim().split(' ');
      if (cubeCheck[1] === 'red' && parseInt(cubeCheck[0], 10) > needRed) {
        needRed = parseInt(cubeCheck[0], 10);
      } else if (
        cubeCheck[1] === 'green' &&
        parseInt(cubeCheck[0], 10) > needGreen
      ) {
        needGreen = parseInt(cubeCheck[0], 10);
      } else if (
        cubeCheck[1] === 'blue' &&
        parseInt(cubeCheck[0], 10) > needBlue
      ) {
        needBlue = parseInt(cubeCheck[0], 10);
      }
    });
  });

  let value: number = 0;
  value = needRed * needGreen * needBlue;

  return value;
};

export const solution2 = () => {
  let result: number = 0;
  inputLines.forEach((line) => {
    result = result + checkPossible(line);
  });
  console.log('Result', result);
  return result;
};
