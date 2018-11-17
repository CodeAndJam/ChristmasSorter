"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Fisher–Yates shuffle
 * @param array Array to be shuffled
 */
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
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
function sortEventMembers(members) {
    const arr = shuffle(members);
    const sendingList = [];
    for (let i = 0; i < arr.length; i++) {
        const from = arr[i];
        console.log("i", i);
        console.log("len", arr.length);
        console.log("comparison: ", arr.length === i);
        const to = i === arr.length - 1 ? arr[0] : arr[i + 1];
        const email = { from, to };
        sendingList.push(email);
    }
    return sendingList;
}
exports.sortEventMembers = sortEventMembers;
//# sourceMappingURL=Sorter.js.map