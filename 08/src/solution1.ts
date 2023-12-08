import { readFileSync } from 'fs';
import { resolve } from 'path';

const input: string = readFileSync(
  resolve(__dirname, '../input/input1.txt'),
  'utf-8'
);

//console.log('Input:', input);
export const solution1 = () => {
  let result: number = 1;
  const lines = input.split('\r\n');

  const instr: string = lines[0];
  const arrMap: string[] = lines.slice(2);

  let currPostName: string = 'AAA';
  let currPoss: string[] = [];
  let instToGo: string = '';
  let inst: string = '';
  let counter: number = 0;

  while (currPostName != 'ZZZ') {
    currPoss = arrMap.filter((position) => position.startsWith(currPostName));
    if (instToGo === '') {
      instToGo = instr.slice(0);
    }

    inst = instToGo.slice(0, 1);
    instToGo = instToGo.slice(1);
    if (inst === 'L') {
      currPostName = currPoss[0]
        .split(' = ')[1]
        .substring(1, 9)
        .split(',')[0]
        .trim();
    } else if (inst === 'R') {
      currPostName = currPoss[0]
        .split(' = ')[1]
        .substring(1, 9)
        .split(',')[1]
        .trim();
    } else {
      console.log('invalid position');
    }
    counter++;
  }

  result = counter;
  console.log('result', result);
  return result;
};
