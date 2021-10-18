/*
const stringNum = "123456789";

//we want the result of stringNum be [1,2,3,4,5,6,7,8,9]

const result = Array.from(stringNum);

console.log(result);
*/

const numArray = [1,2,3,4,5,6,7,8,9,1,3,5,2,6,7,3,9,4,6,7,0,6,4,5,2,2,1,3,4,5];

const result = Array.from(new Set(numArray))
console.log(result);
