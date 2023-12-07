import { readFileSync } from 'fs';
import { resolve } from 'path';

const input: string = readFileSync(
  resolve(__dirname, '../input/input1.txt'),
  'utf-8'
);

//console.log('Input:', input);

const calcStrength = (arrCard: string[]): number => {
  const countCards: Record<string, number> = arrCard.reduce(
    (acc, value: string) => {
      acc[value] = (acc[value] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  let num5: number = Object.values(countCards).filter(
    (record) => record === 5
  ).length;
  let num4: number = Object.values(countCards).filter(
    (record) => record === 4
  ).length;
  let num3: number = Object.values(countCards).filter(
    (record) => record === 3
  ).length;
  let num2: number = Object.values(countCards).filter(
    (record) => record === 2
  ).length;
  let num1: number = Object.values(countCards).filter(
    (record) => record === 1
  ).length;
  let strength: number = 0;
  const numJoker: number = arrCard.filter((card) => card === 'J').length;

  if (numJoker == 1) {
    num1--;
    if (num4 == 1) {
      num4--;
      num5++;
    } else if (num3 == 1) {
      num1--;
      num4++;
    } else if (num2 == 2 || num2 == 1) {
      num2--;
      num3++;
    } else if (num1 >= 1) {
      num1--;
      num2++;
    }
  } else if (numJoker == 2) {
    num2--;
    if (num3 == 1) {
      num3--;
      num5++;
    } else if (num2 == 1) {
      num2--;
      num4++;
    } else if (num1 >= 1) {
      num1--;
      num3++;
    }
  } else if (numJoker == 3) {
    num3--;
    if (num2 == 1) {
      num2--;
      num5++;
    } else if (num1 > 1) {
      num1--;
      num4++;
    }
  } else if (numJoker == 4) {
    num4--;
    num1--;
    num5++;
  } else if (numJoker == 5) {
    num5--;
    num5++;
  }

  if (num5 == 1) {
    strength = 7;
  } else if (num4 == 1) {
    strength = 6;
  } else if (num3 == 1 && num2 == 1) {
    strength = 5;
  } else if (num3 == 1) {
    strength = 4;
  } else if (num2 == 2) {
    strength = 3;
  } else if (num2 == 1) {
    strength = 2;
  } else if (num1 == 5) {
    strength = 1;
  }

  console.log(arrCard, strength);
  return strength;
};

const replaceCards = (rangeArr: string[]) => {
  const objMap: Record<string, string> = {
    A: 'A',
    K: 'B',
    Q: 'C',
    J: 'N',
    T: 'E',
    9: 'F',
    8: 'G',
    7: 'H',
    6: 'I',
    5: 'J',
    4: 'K',
    3: 'L',
    2: 'M'
  };
  //["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"];
  //["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M"

  const regEx: RegExp = new RegExp(Object.keys(objMap).join('|'), 'gi');
  rangeArr = rangeArr.map((card: string) => {
    const cardarr: string[] = card.split(' ');
    card =
      cardarr[1].replace(regEx, (matched) => {
        return objMap[matched];
      }) +
      ' ' +
      cardarr[2];
    return card;
  });
  return rangeArr;
};

export const solution2 = () => {
  let result: number = 1;
  const lines = input.split('\r\n');

  const arrValuesAndCards: string[] = [];

  lines.forEach((line) => {
    const cards: string[] = line.split(' ')[0].split('');

    const strenght: number = calcStrength(cards);

    arrValuesAndCards.push(strenght + ' ' + line);
  });

  let allRang1: string[] = arrValuesAndCards.filter((card) => card[0] === '1');
  let allRang2: string[] = arrValuesAndCards.filter((card) => card[0] === '2');
  let allRang3: string[] = arrValuesAndCards.filter((card) => card[0] === '3');
  let allRang4: string[] = arrValuesAndCards.filter((card) => card[0] === '4');
  let allRang5: string[] = arrValuesAndCards.filter((card) => card[0] === '5');
  let allRang6: string[] = arrValuesAndCards.filter((card) => card[0] === '6');
  let allRang7: string[] = arrValuesAndCards.filter((card) => card[0] === '7');

  allRang1 = replaceCards(allRang1).sort().reverse();
  allRang2 = replaceCards(allRang2).sort().reverse();
  allRang3 = replaceCards(allRang3).sort().reverse();
  allRang4 = replaceCards(allRang4).sort().reverse();
  allRang5 = replaceCards(allRang5).sort().reverse();
  allRang6 = replaceCards(allRang6).sort().reverse();
  allRang7 = replaceCards(allRang7).sort().reverse();

  let resultOders = allRang1.concat(
    allRang2,
    allRang3,
    allRang4,
    allRang5,
    allRang6,
    allRang7
  );
  resultOders = resultOders.map((result) => result.split(' ')[1]);

  const results: number[] = resultOders.map(
    (value, index) => parseInt(value, 10) * (index + 1)
  );
  console.log(results);
  result = results.reduce((a, b) => {
    return a + b;
  });

  /*.map((card1:string) => {
    let cardarr:string[] = card1.split(" ");
    card1 = cardarr[1].replace(regEx, (matched)=>{return objMap[matched]}) + " " + cardarr[2];
    return card1;
  });
*/
  console.log('result', result);
  return result;
};
