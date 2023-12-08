import { readFileSync } from 'fs';
import { resolve } from 'path';

const input: string = readFileSync(
  resolve(__dirname, '../input/input1.txt'),
  'utf-8'
);

const findZ = (startPos: string, arrMap: string[], allInst: string) => {
  let field: string[] = [];
  let instToGo: string = allInst;
  let nextInst: string = '';
  let curPos: string = startPos;
  let counter: number = 0;

  while (!curPos.endsWith('Z')) {
    field = arrMap.filter((map) => map.startsWith(curPos));
    if (instToGo == '') {
      instToGo = allInst;
    }
    nextInst = instToGo.slice(0, 1);
    instToGo = instToGo.slice(1);
    if (nextInst === 'L') {
      curPos = field[0].split(' = ')[1].substring(1, 9).split(',')[0].trim();
    } else if (nextInst === 'R') {
      curPos = field[0].split(' = ')[1].substring(1, 9).split(',')[1].trim();
    } else {
      console.log('invalid position');
    }

    counter++;
  }

  return counter;
};

const lcm = (...arr: number[]): number => {
  const gcd = (x: number, y: number): number => (!y ? x : gcd(y, x % y));
  const _lcm = (x: number, y: number): number => (x * y) / gcd(x, y);
  return [...arr].reduce((a, b) => _lcm(a, b));
};

//console.log('Input:', input);
export const solution2 = () => {
  let result: number = 0;
  const lines = input.split('\r\n');
  const instr: string = lines[0];
  const arrMap: string[] = lines.slice(2);
  const arrStart = arrMap
    .filter((position) => position.split(' = ')[0].endsWith('A'))
    .map((line) => line.substring(0, 3));

  const arrHit: number[] = [];
  arrStart.forEach((startPos, index) => {
    console.log(startPos);
    arrHit[index] = findZ(startPos, arrMap, instr);
    console.log('indx', index, 'result', result);
  });

  result = lcm(...arrHit);
  console.log('result', result);
  return result;
};
