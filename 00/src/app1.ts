import { solution1 } from './solution1';

class App1 {
  static start() {
    const result = solution1();
    return result;
  }
}

// Invoking the start method directly on the class
console.log('START');
App1.start();
console.log('END');
