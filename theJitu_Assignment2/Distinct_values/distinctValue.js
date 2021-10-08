/*
1. create an array of the Values.
2.create a function
3. use the for-loop method
4. Create a conditional statement for the array.
5. console log the function
*/

const distinctArrayNum = [1, 3, 5, 3, 7, 3, 1, 1, 5];

const uniqueValues = array => {
    let array1 = [];
    for(let i = 0; i < array.length; i++) {
        if(array1.includes(array[i]))
            continue;
        array1.push(array[i]);
    }

    return array1;
}

console.log(uniqueValues(distinctArrayNum))

