"use strict";
exports.__esModule = true;
/**
 * Fisher–Yates shuffle
 * @param array Array to be shuffled
 */
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
var Sorter = /** @class */ (function () {
    function Sorter() {
    }
    Sorter.prototype.sortEventMembers = function (members) {
        var arr = shuffle(members);
        var sendingList = [];
        for (var i = 0; i < arr.length; i++) {
            var from = arr[i];
            var to = i === arr.length - 1 ? arr[0] : arr[i + 1];
            var email = { from: from, to: to };
            sendingList.push(email);
        }
        return sendingList;
    };
    return Sorter;
}());
exports["default"] = Sorter;
