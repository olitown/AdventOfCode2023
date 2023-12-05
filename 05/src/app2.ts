import { solution2 } from './solution2';

class App1 {
  static start() {
    const result = solution2();
    return result;
  }
}

// Invoking the start method directly on the class
console.log('START');
App1.start();
console.log('END');
