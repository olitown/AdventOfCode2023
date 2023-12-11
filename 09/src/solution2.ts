import { readFileSync } from 'fs';
import { resolve } from 'path';

const input: string = readFileSync(
  resolve(__dirname, '../input/input1.txt'),
  'utf-8'
);


const getNextLine = (oldLine:number[]):number[] => {
  let newLine:number[] = [];
  newLine = oldLine.flatMap((curNum:number, index:number) => {
    if (index < oldLine.length-1){
        return [oldLine[index+1] - curNum]
    } 
    else {
      return[];
    }
  });
  return newLine;
};

const calcPrev = (curLine:number[]):number => {
  //all values are the same
  if (curLine.every (value => value ==curLine[0])) {
    return curLine[0];
  }
  //not the same
  const  nextLine = getNextLine(curLine);
  const prevVal = calcPrev(nextLine);
  return (curLine.at(0) ?? 0) - prevVal;
};

//console.log('Input:', input);
export const solution2 = () => {
  let result: number = 0;
  const lines = input.split('\r\n').map((line) => line.split(" ").map(Number) );
  
  lines.forEach((line) => {
    var nextValue = calcPrev(line)
    result = result + nextValue;  
  });

  console.log('result', result);
  return result;
};
