/*
    convert to string
    get char array
    reverse it
    make it string
    parseInt
    add + or - if it has
*/

const reverseInt = (int) => {
  return (
    parseInt(int.toString().split("").reverse().join("")) * (int < 0 ? -1 : 1)
  );
};
