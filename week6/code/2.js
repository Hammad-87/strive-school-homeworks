/*
    remove all white spaces in string
    convert to char array
    convert char array to ascii numbers
    sort array
    convert array to string
    compare strings

*/

const anagrams = (string1, string2) => {
  return (
    JSON.stringify(
      string1
        .replace(/ /g, "")
        .split("")
        .map((char) => char.charCodeAt(0))
        .sort((a, b) => a - b)
    ) ===
    JSON.stringify(
      string2
        .replace(/ /g, "")
        .split("")
        .map((char) => char.charCodeAt(0))
        .sort((a, b) => a - b)
    )
  );
};

module.exports = anagrams;
