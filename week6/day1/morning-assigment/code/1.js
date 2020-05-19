/*

function takes parameter
create new array with number of max ascii table char code and fill it with zero        
create char array and map it
whenever we see same char number we increase the number in the array
which is in the  position of that char number 
this approach creates an frequency array

String.fromCharCode(frequency.indexOf(Math.max(...frequency))) => gives us the char
max(...frequency) => gives max occurs
frequency.indexOf(Math.max(...frequency)) => gives the char code (index) which is max occurs

*/

const maxChar = (string) => {
  let frequency = new Array(127).fill(0);
  string.split("").map((char) => {
    frequency[char.charCodeAt(0)]++;
  });
  return {
    char: String.fromCharCode(frequency.indexOf(Math.max(...frequency))),
    frequency: Math.max(...frequency),
    code: frequency.indexOf(Math.max(...frequency)),
  };
};
