import { readFileSync } from 'fs';
import { resolve } from 'path';

const input: string = readFileSync(
  resolve(__dirname, '../input/input1.txt'),
  'utf-8'
);

const inputLines: Array<string> = input.split('\r\n');

console.log('Input:', input);

export const solution1 = () => {
  let result: number = 0;
  inputLines.forEach((line) => {
    const lineOnlyNum: string = line.replace(/[^\d]/g, ''); // 1238
    const firstNumStr: string | undefined = lineOnlyNum.split('').shift();
    const lastNumStr: string | undefined = lineOnlyNum.split('').pop();
    let firstNum: number = 0;
    let lastNum: number = 0;

    if (firstNumStr != undefined) {
      firstNum = parseInt(firstNumStr, 10);
    }
    if (lastNumStr != undefined) {
      lastNum = parseInt(lastNumStr, 10);
    } else {
      lastNum = firstNum;
    }

    console.log('Line', line, 'First', firstNum, 'Last', lastNum);
    result = result + firstNum * 10 + lastNum;
  });
  console.log('Result', result);
  return result;
};
