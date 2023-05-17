//deprecated use eval() method instead
const evaluateArray = (array) => {
  let newArray = [...array];
  while (newArray.includes('*') || newArray.includes('÷')) {
    let index = newArray.findIndex((element) => element == '*' || element == '÷');
    if (newArray[index] == '*') {
      let result = newArray[index - 1] * newArray[index + 1];
      newArray.splice(index - 1, 3, result);
    } else {
      let result = newArray[index - 1] / newArray[index + 1];
      newArray.splice(index - 1, 3, result);
    }
  }
  while (newArray.includes('+') || newArray.includes('-')) {
    let index = newArray.findIndex((element) => element == '+' || element == '-');
    if (newArray[index] == '+') {
      let result = newArray[index - 1] + newArray[index + 1];
      newArray.splice(index - 1, 3, result);
    } else {
      let result = newArray[index - 1] - newArray[index + 1];
      newArray.splice(index - 1, 3, result);
    }
  }
  return newArray[0];
};

export default evaluateArray;
