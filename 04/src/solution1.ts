import { readFileSync } from 'fs';
import { resolve } from 'path';

const input: string = readFileSync(
  resolve(__dirname, '../input/input1.txt'),
  'utf-8'
);

console.log('Input:', input);

const calculateGeometricSum = (n: number): number => {
  let sum = 1;
  for (let i = 1; i < n; i++) {
    sum = sum * 2;
  }
  if (n == 0) {
    sum = 0;
  }
  return sum;
};

export const solution1 = () => {
  let result: number = 0;
  const lines = input.split('\r\n');

  lines.forEach((line) => {
    console.log(line);
    const cardNum = line.split(':')[1].trim().split('|')[0].trim().split(' ');
    const winNum = line
      .split(':')[1]
      .trim()
      .split('|')[1]
      .trim()
      .split(' ')
      .filter((element) => element != '');

    const intersection = cardNum.filter((x) => winNum.includes(x));

    const numDigits = intersection.length;

    result = result + calculateGeometricSum(numDigits);

    console.log(line);
  });

  console.log('Result', result);
  return result;
};
