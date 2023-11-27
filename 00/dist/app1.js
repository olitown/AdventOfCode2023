"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var solution1_1 = require("./solution1");
var App1 = /** @class */ (function () {
    function App1() {
    }
    App1.start = function () {
        var result = (0, solution1_1.solution1)();
        return result;
    };
    return App1;
}());
// Invoking the start method directly on the class
console.log('START');
App1.start();
console.log('END');
//# sourceMappingURL=app1.js.map