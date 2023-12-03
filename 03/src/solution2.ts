import { readFileSync } from 'fs';
import { resolve } from 'path';

const input: string = readFileSync(
  resolve(__dirname, '../input/input1.txt'),
  'utf-8'
);

console.log('Input:', input);

const getAllStars = (
  charArray: string[][]
): { row: number; column: number }[] => {
  const stars: { row: number; column: number }[] = [];

  for (let i = 0; i < charArray.length; i++) {
    for (let j = 0; j < charArray[i].length; j++) {
      if (charArray[i][j] === '*') {
        stars.push({ row: i, column: j });
      }
    }
  }
  return stars;
};

const returnNumAtPos = (line: string, pos: number) => {
  let num: number = 0;
  let testPos: number = 0;
  let result: number = 0;
  for (const char of line) {
    if (/\d/.test(char)) {
      num = num * 10 + parseInt(char, 10);
    } else {
      if (result == 0 && testPos > pos) {
        result = num;
      }
      num = 0;
    }
    testPos++;
  }
  if (result == 0) {
    result = num;
  }
  console.log('num', result);
  return result;
};

const reduceStars = (
  stars: { row: number; column: number }[],
  digits: string[][]
) => {
  const remainStars: { row: number; column: number }[] = [];
  let result: number = 1;
  let totalSum: number = 0;
  stars.forEach((star) => {
    // console.log (star.row, star.column);
    //check before and after
    const numLeft: boolean = !isNaN(
      parseInt(digits[star.row][star.column - 1])
    );
    const numRight: boolean = !isNaN(
      parseInt(digits[star.row][star.column + 1])
    );
    const numUp: boolean = !isNaN(parseInt(digits[star.row - 1][star.column]));
    const numLow: boolean = !isNaN(parseInt(digits[star.row + 1][star.column]));
    const numUpLeft: boolean = !isNaN(
      parseInt(digits[star.row - 1][star.column - 1])
    );
    const numUpRight: boolean = !isNaN(
      parseInt(digits[star.row - 1][star.column + 1])
    );
    const numLowLeft: boolean = !isNaN(
      parseInt(digits[star.row + 1][star.column - 1])
    );
    const numLowRight: boolean = !isNaN(
      parseInt(digits[star.row + 1][star.column + 1])
    );

    const neighbour = [
      numLeft,
      numRight,
      numUp,
      numLow,
      numUpLeft,
      numUpRight,
      numLowLeft,
      numLowRight
    ];

    let countNums = neighbour.filter((value) => value === true).length;

    if (numUp && numUpLeft) {
      countNums--;
    }
    if (numUp && numUpRight) {
      countNums--;
    }
    if (numLow && numLowLeft) {
      countNums--;
    }
    if (numLow && numLowRight) {
      countNums--;
    }

    if (countNums >= 2) {
      console.log('INCLUDE');
      remainStars.push(star);

      if (numLeft) {
        result =
          result * returnNumAtPos(digits[star.row].join(''), star.column - 1);
      }
      if (numRight) {
        result =
          result * returnNumAtPos(digits[star.row].join(''), star.column + 1);
      }
      if (numUp) {
        result =
          result * returnNumAtPos(digits[star.row - 1].join(''), star.column);
      }
      if (numUpLeft && !numUp) {
        result =
          result *
          returnNumAtPos(digits[star.row - 1].join(''), star.column - 1);
      }
      if (numUpRight && !numUp) {
        result =
          result *
          returnNumAtPos(digits[star.row - 1].join(''), star.column + 1);
      }

      if (numLow) {
        result =
          result * returnNumAtPos(digits[star.row + 1].join(''), star.column);
      }
      if (numLowLeft && !numLow) {
        result =
          result *
          returnNumAtPos(digits[star.row + 1].join(''), star.column - 1);
      }
      if (numLowRight && !numLow) {
        result =
          result *
          returnNumAtPos(digits[star.row + 1].join(''), star.column + 1);
      }
      totalSum = totalSum + result;
      console.log('Sum:', totalSum);
      result = 1;
    }
  });
  return totalSum;
};

export const solution2 = () => {
  let result: number = 0;
  const digits = input.split('\r\n').map(function (el) {
    return el.split('');
  });

  const stars = getAllStars(digits);
  result = reduceStars(stars, digits);

  console.log('Result', result);
  return result;
};
