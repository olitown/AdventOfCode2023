import { readFileSync } from 'fs';
import { resolve } from 'path';

const input: string = readFileSync(
  resolve(__dirname, '../input/input1.txt'),
  'utf-8'
);

type Position = {
  row: number;
  col: number;
};

const cylceLength = (
  fromDirection: string,
  curPos: Position,
  startPos: Position,
  lines: string[][]
): number => {
  let length: number = 0;
  length++;
  const nextPos: Position = { ...curPos };

  console.log(lines[curPos.row][curPos.col], curPos);

  if (
    curPos.row === startPos.row &&
    curPos.col === startPos.col &&
    length > 0
  ) {
    //start reached
    return length;
  } else {
    switch (lines[curPos.row][curPos.col]) {
      case '|':
        if (fromDirection === 'S') {
          nextPos.row--;
          fromDirection = 'S';
        } else if (fromDirection === 'N') {
          nextPos.row++;
          fromDirection = 'N';
        }
        break;
      case '-':
        if (fromDirection === 'W') {
          nextPos.col++;
          fromDirection = 'W';
        } else if (fromDirection === 'E') {
          nextPos.col--;
          fromDirection = 'E';
        }
        break;
      case 'L':
        if (fromDirection === 'N') {
          nextPos.col++;
          fromDirection = 'W';
        } else if (fromDirection === 'E') {
          nextPos.row--;
          fromDirection = 'S';
        }
        break;
      case 'J':
        if (fromDirection === 'W') {
          nextPos.row--;
          fromDirection = 'S';
        } else if (fromDirection === 'N') {
          nextPos.col--;
          fromDirection = 'E';
        }
        break;
      case '7':
        if (fromDirection === 'S') {
          nextPos.col--;
          fromDirection = 'E';
        } else if (fromDirection === 'W') {
          nextPos.row++;
          fromDirection = 'N';
        }
        break;
      case 'F':
        if (fromDirection === 'E') {
          nextPos.row++;
          fromDirection = 'N';
        } else if (fromDirection === 'S') {
          nextPos.col++;
          fromDirection = 'W';
        }
        break;
    }
    length = 1 + cylceLength(fromDirection, nextPos, startPos, lines);
  }

  return length;
};

//console.log('Input:', input);
export const solution1 = () => {
  let result: number = 0;
  const startPos: Position = { row: 0, col: 0 };
  let curPos: Position = { row: 0, col: 0 };
  const lines = input.split('\r\n').map((line) => line.split(''));

  const rowStart: number = lines.findIndex((row) => row.includes('S'));
  const colStart: number = lines[rowStart].indexOf('S');

  let fromDirection: string = '';
  startPos.row = rowStart;
  startPos.col = colStart;
  curPos = { ...startPos };

  const regEx: RegExp = /[-|LJ7F]/;

  //find first
  if (regEx.test(lines[startPos.row + 1][startPos.col])) {
    fromDirection = 'N';
    curPos.row++;
  } else if (regEx.test(lines[startPos.row - 1][startPos.col])) {
    fromDirection = 'S';
    curPos.row--;
  } else if (regEx.test(lines[startPos.row][startPos.col + 1])) {
    fromDirection = 'W';
    curPos.col++;
  } else if (regEx.test(lines[startPos.row][startPos.col - 1])) {
    fromDirection = 'E';
    curPos.col--;
  }

  result = cylceLength(fromDirection, curPos, startPos, lines);

  console.log('result', result / 2);
  return result;
};
