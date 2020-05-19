/*
    this is a recursive approach:
    it returns chunks until remainings is []
    array slice creates sliced array with given length
    remainings => array.slice(size);
    new chunk => chunks(remainings,size)
    ...chunks(remainings,size) => all new chunks 
    
*/

const chunks = (array, size) => {
  return array.length > 0
    ? [array.slice(0, size), ...chunks(array.slice(size), size)]
    : [];
};
