/*
    import anagram function as isAnagram
    create empty array called subList 
    iterate source word list if word is anagram with given word
    push it to sublist
    return subList
*/

const isAnagram = require("./2");
const searchAnagram = (search, source) => {
  let subList = [];
  search = search.toLowerCase();
  for (let i = 0; i < source.length; i++) {
    let word = source[i];
    if (isAnagram(search, word)) {
      subList.push(word);
    }
  }
  return subList;
};
