/*
1. Print From 1-100
2. Multiples of 3 => Fizz
3.Multiples of 5 => Buzz
4. Multiple of Both 3 and 5 [15] => FizzBUzz
*/
const fizzBuzz = () => {
  for (let i = 1; i <= 100; i++) {
    if (i % 15 === 0) {
      console.log("FizzBuzz");
    } else if (i % 3 === 0) {
      console.log("Fizz");
    } else if (i % 5 === 0) {
      console.log("Buzz");
    } else {
      console.log(i);
    }
  }
};

