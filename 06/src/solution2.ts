import { readFileSync } from 'fs';
import { resolve } from 'path';

const input: string = readFileSync(
  resolve(__dirname, '../input/input1.txt'),
  'utf-8'
);

console.log('Input:', input);

const calcDist = (holdTime: number, raceTime: number): number => {
  const travelTime: number = raceTime - holdTime;
  const travelSpeed: number = holdTime;
  const distance: number = travelTime * travelSpeed;
  return distance;
};

export const solution2 = () => {
  let result: number = 1;
  const lines = input.split('\r\n');

  const raceTime: number = parseInt(
    lines
      .filter((line) => line.startsWith('Time: '))[0]
      .split(':')[1]
      .split(' ')
      .join(''),
    10
  );

  const minDist: number = parseInt(
    lines
      .filter((line) => line.startsWith('Distance: '))[0]
      .split(':')[1]
      .split(' ')
      .join(''),
    10
  );

  //first winning race
  let firstRacefound: boolean = false;
  let testTime = 0;
  let firstWinTime = 0;
  while (!firstRacefound) {
    if (minDist < calcDist(testTime, raceTime)) {
      firstRacefound = true;
      firstWinTime = testTime;
    }
    testTime++;
  }

  //last winning race
  let lastRacefound: boolean = false;
  testTime = raceTime - 1;
  let lastWinTime = 0;
  while (!lastRacefound) {
    if (minDist < calcDist(testTime, raceTime)) {
      lastRacefound = true;
      lastWinTime = testTime;
    }
    testTime--;
  }

  const numWinRaces = lastWinTime - firstWinTime + 1;
  result = result * numWinRaces;

  console.log('result', result);
  return result;
};
