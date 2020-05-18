/*
  create empty string with given length
  create charArray;
  update string's i. element with # at  each step
  
*/

const steps = (length) => {
  let str = new Array(length).join(" ");
  let charArray = str.split("");
  for (let i = 0; i < length; i++) {
    charArray[i] = "#";
    str = charArray.join("");
    console.log(`'${str}'`);
  }
};

steps(5);
