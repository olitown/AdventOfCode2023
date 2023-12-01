import { readFileSync } from 'fs';
import { resolve } from 'path';

const input: string = readFileSync(
  resolve(__dirname, '../input/input1.txt'),
  'utf-8'
);

const inputLines: Array<string> = input.split('\r\n');

export const solution2 = () => {
  let result: number = 0;
  inputLines.forEach((line) => {
    const lineOrg: string = line.slice();
    line = line.replaceAll('one', 'o1e');
    line = line.replaceAll('two', 't2o');
    line = line.replaceAll('three', 't3e');
    line = line.replaceAll('four', 'f4r');
    line = line.replaceAll('five', 'f5e');
    line = line.replaceAll('six', 's6x');
    line = line.replaceAll('seven', 's7n');
    line = line.replaceAll('eight', 'e8t');
    line = line.replaceAll('nine', 'n9e');

    const lineOnlyNum: string = line.replace(/[^\d]/g, '');

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
    console.log(
      'lineOrg',
      lineOrg,
      'lineOnlyNum',
      lineOnlyNum,
      'First',
      firstNum,
      'Last',
      lastNum,
      'ResultOld',
      result,
      'ResultNew',
      result + firstNum * 10 + lastNum
    );
    result = result + firstNum * 10 + lastNum;
  });
  console.log('Result', result);
  return result;
};
