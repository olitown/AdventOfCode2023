import { readFileSync } from 'fs';
import { resolve } from 'path';

const input = readFileSync(resolve(__dirname, '../input/input1.txt'), 'utf-8');

const lines = input.split('\n');

console.log('Input:', input);
console.log('Lines:', lines);

export const solution1 = () => {
  const valueList = lines.map((line) => parseInt(line, 10));
  const greeting = 'Hello TEST!';
  return greeting;
};
