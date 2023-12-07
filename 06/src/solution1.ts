import { readFileSync } from 'fs';
import { resolve } from 'path';

const input: string = readFileSync(
  resolve(__dirname, '../input/input1.txt'),
  'utf-8'
);

//console.log('Input:', input);

const calcDist = (holdTime: number, raceTime: number): number => {
  const travelTime: number = raceTime - holdTime;
  const travelSpeed: number = holdTime;
  const distance: number = travelTime * travelSpeed;
  return distance;
};

export const solution1 = () => {
  const startTime:number = Date.now(); 
  let result: number = 1;
  const lines = input.split('\r\n');

  const arrTime: number[] = lines
    .filter((line) => line.startsWith('Time: '))[0]
    .split(':')[1]
    .trim()
    .replace(/\s\s+/g, ' ')
    .split(' ')
    .map(Number);

  const arrMinDist: number[] = lines
    .filter((line) => line.startsWith('Distance: '))[0]
    .split(':')[1]
    .trim()
    .replace(/\s\s+/g, ' ')
    .split(' ')
    .map(Number);

  const numRaces = arrTime.length;

  for (let testRace = 0; testRace < numRaces; testRace++) {
    //first winning race
    let firstRacefound: boolean = false;
    let testTime = 0;
    let firstWinTime = 0;
    while (!firstRacefound) {
      if (arrMinDist[testRace] < calcDist(testTime, arrTime[testRace])) {
        firstRacefound = true;
        firstWinTime = testTime;
      }
      testTime++;
    }

    //last winning race
    let lastRacefound: boolean = false;
    testTime = arrTime[testRace] - 1;
    let lastWinTime = 0;
    while (!lastRacefound) {
      if (arrMinDist[testRace] < calcDist(testTime, arrTime[testRace])) {
        lastRacefound = true;
        lastWinTime = testTime;
      }
      testTime--;
    }

    const numWinRaces = lastWinTime - firstWinTime + 1;
    result = result * numWinRaces;
  }
  const endTime:number = Date.now(); 
  console.log('result', result, "time", endTime-startTime);
  return result;
};
