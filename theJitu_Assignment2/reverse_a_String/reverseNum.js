const reverseNum = (number) => {
    const numArray = [];
    for(let i = number; i > 0  ; i--){
        console.log(i + " ")
        if( i % 3 === 0){
            numArray.push(i);
        }
    }

    console.log(numArray);
}
let number = 100;
reverseNum(number)