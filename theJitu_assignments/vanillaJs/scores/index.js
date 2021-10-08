/*
Complete the getGrade(score) function below. It has one parameter: an integer score denoting the number of points Julia earned on an exam. It must return the letter corresponding to her grade according to the following rules:
If 25 > score <= 30, then grade = A
If 20 > score <= 25, then grade = B
If 15 > score <= 20, then grade = C
If 10 > score <= 15, then grade = D
If 5 > score <= 10, then grade = E
If 0 > score <= 5, then grade = F

CONSTRAINTS: 0 >= score <=30
*/

const getGrade = (score) => {
  if (score <= 5) {
    return "Grade F";
  } else if (score <= 10) {
    return "Grade E";
  } else if (score <= 15) {
    return "Grade D";
  } else if (score <= 20) {
    return "Grade C";
  } else if (score <= 25) {
    return "Grade B";
  } else if (score <= 30) {
    return "Grade A";
  } else {
    return "30 is the grade Limit";
  }
};

const typeInput = () => {

  process.stdin.on("data", (data) => {
    console.log(`Grade Input`);
    const score = data;
    getGrade(score)
    process.exit();
  });
};
typeInput();