import Member from "../Shared/Interfaces/Member.interface";
import { EmailList } from "./EmailList.interface";


/**
 * Fisher–Yates shuffle
 * @param array Array to be shuffled
 */
function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

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

exports.sortEventMembers = function (members: Array<Member>) : Array<EmailList> {


  const arr: Array<Member> = shuffle(members);

  const sendingList: Array<EmailList> = [];

for(let i = 0; i < arr.length;  i ++){

    const from = arr[i] ;
    
    const to = i === arr.length - 1 ? arr[0] : arr[i+1] ;
    const email: EmailList = {from, to};
    sendingList.push(email);

}

  return sendingList;
}
