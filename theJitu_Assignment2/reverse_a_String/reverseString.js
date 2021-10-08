/*
Write a program that can Reverse 
a sentence ("bob likes dogs" -> "dogs likes bob")
*/
const reverseStr = (str) => {
  let reverseString = str.split(" ");
  console.log(reverseString);
  let reverseArrayStr = reverseString.reverse();
  console.log(reverseArrayStr);
  let arrayStrJoin = reverseArrayStr.join(" ");
  console.log(arrayStrJoin);
  return arrayStrJoin;
};
console.log(reverseStr("bob likes dogs"));

//refactoring code
const reverseStr = (str) => {
    let reversedString = str.split(" ").reverse().join(" ");

    return reverseStr
}
console.log(reverseStr("bob likes dogs"))
