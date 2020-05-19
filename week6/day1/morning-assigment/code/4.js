/*
    trim word remove empty spaces at the beggining and the end
    j is the last char index
    i  is the first char index
    loop will work until middle of the word 
    compare first and last char
    if  they are equal 
        increase i 
        decrease j
    else
        return false
*/
const palindrom = (word) => {
  word = word.trim();
  let j = word.length - 1;
  for (let i = 0; i < word.length / 2 - 1; ) {
    if (word.split("")[i] !== word.split("")[j]) {
      return false;
    } else {
      j--;
      i++;
    }
  }
  return true;
};
