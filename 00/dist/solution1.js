"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.solution1 = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
var input = (0, fs_1.readFileSync)((0, path_1.resolve)(__dirname, '../input/input1.txt'), 'utf-8');
var lines = input.split('\n');
console.log('Input:', input);
console.log('Lines:', lines);
var solution1 = function () {
    var valueList = lines.map(function (line) { return parseInt(line, 10); });
    var greeting = 'Hello TEST!';
    return greeting;
};
exports.solution1 = solution1;
//# sourceMappingURL=solution1.js.map