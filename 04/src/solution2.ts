import { readFileSync } from 'fs';
import { resolve } from 'path';

const input: string = readFileSync(
  resolve(__dirname, '../input/input1.txt'),
  'utf-8'
);

console.log('Input:', input);

export const solution2 = () => {
  let result: number = 0;
  const lines = input.split('\r\n');

  const numCards = Array(lines.length).fill(1);

  lines.forEach((line, counter) => {
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

    const numHits = intersection.length;

    const numCard = numCards[counter];

    for (let i: number = 0; i < numHits; i++) {
      numCards[counter + i + 1] = numCards[counter + i + 1] + numCard;
    }

    console.log(line);
  });

  result = numCards.reduce((a, b) => {
    return a + b;
  });
  console.log('Result', result);
  return result;
};
