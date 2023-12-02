import { readFileSync } from 'fs';
import { resolve } from 'path';

const input: string = readFileSync(
  resolve(__dirname, '../input/input1.txt'),
  'utf-8'
);

const inputLines: Array<string> = input.split('\r\n');

console.log('Input:', input);

export const checkPossible = (line: string) => {
  const maxRed: number = 12;
  const maxGreen: number = 13;
  const maxBlue: number = 14;
  let possible: boolean = true;
  const gameArr: string[] = line.split(':');

  const gameNum: number = parseInt(gameArr[0].replace(/[^\d]/g, ''), 10);

  const setArr: string[] = gameArr[1].split(';');

  setArr.forEach((set) => {
    const cubeArr: string[] = set.split(',');
    cubeArr.forEach((cube) => {
      const cubeCheck: string[] = cube.trim().split(' ');
      if (
        (cubeCheck[1] === 'red' && parseInt(cubeCheck[0], 10) > maxRed) ||
        (cubeCheck[1] === 'green' && parseInt(cubeCheck[0], 10) > maxGreen) ||
        (cubeCheck[1] === 'blue' && parseInt(cubeCheck[0], 10) > maxBlue)
      ) {
        console.log('impossible color', cubeCheck[1], cubeCheck[0]);
        possible = false;
      }
    });
  });

  let value: number = 0;
  if (possible) {
    value = gameNum;
  }

  return value;
};

export const solution1 = () => {
  let result: number = 0;
  inputLines.forEach((line) => {
    result = result + checkPossible(line);
  });
  console.log('Result', result);
  return result;
};
