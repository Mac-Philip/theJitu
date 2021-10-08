

const check_Min_Value = [678, "Avengers", 365, "sleep", 45, "classified", "dog", "a"];

let min_Value = Infinity;

for (let i = 0; i < check_Min_Value.length; i++) { 

    if (typeof(check_Min_Value[i]) === "number"){
        if (min_Value >check_Min_Value[i]) {
        min_Value = check_Min_Value[i];
    }
}
    
}

console.log(min_Value);

