import { readFileSync } from 'fs';
import { resolve } from 'path';

const input: string = readFileSync(
  resolve(__dirname, '../input/input1.txt'),
  'utf-8'
);

console.log('Input:', input);

export const solution1 = () => {
  let result: number = 0;
  const digits = input.split('\r\n').map(function (el) {
    return el.split('');
  });
  let num: number = 0;
  let incl = false;
  //const validChars:string[] = ["+", "$", "#", "*", "/", "@", "%", "=", "&"];
  const regex = /^[^.0-9]+$/; //check if neither a . nor a number
  for (let i: number = 0; i < digits.length; i++) {
    //loop lines
    for (let j: number = 0; j < digits[i].length; j++) {
      //loop colums
      // console.log("i", i, "j", j, "value", parseInt(digits[i][j], 10));
      if (!isNaN(parseInt(digits[i][j], 10))) {
        num = num * 10 + parseInt(digits[i][j], 10);
        //check line
        if (
          !incl &&
          ((digits[i][j - 1] !== undefined && regex.test(digits[i][j - 1])) ||
            (digits[i][j + 1] !== undefined && regex.test(digits[i][j + 1])))
        ) {
          incl = true;
        }
        //check previous line
        if (
          !incl &&
          i > 0 &&
          ((digits[i - 1][j] !== undefined && regex.test(digits[i - 1][j])) ||
            (digits[i - 1][j - 1] !== undefined &&
              regex.test(digits[i - 1][j - 1])) ||
            (digits[i - 1][j + 1] !== undefined &&
              regex.test(digits[i - 1][j + 1])))
        ) {
          incl = true;
        }
        //check next line
        if (
          !incl &&
          i < digits.length - 1 &&
          ((digits[i + 1][j] !== undefined && regex.test(digits[i + 1][j])) ||
            (digits[i + 1][j - 1] !== undefined &&
              regex.test(digits[i + 1][j - 1])) ||
            (digits[i + 1][j + 1] !== undefined &&
              regex.test(digits[i + 1][j + 1])))
        ) {
          incl = true;
        }
      } else {
        if (incl) {
          console.log('Add to Result', num);
          result = result + num;
        } else if (num > 0) {
          console.log('Not added to Result', num);
        }
        num = 0;
        incl = false;
      }
    }
  }
  console.log('Result', result);
  return result;
};
