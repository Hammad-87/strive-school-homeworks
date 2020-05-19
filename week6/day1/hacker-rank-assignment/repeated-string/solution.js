function repeatedString(s, n) {
  let infiniteString = "";
  if (s.length === 1) return s === "a" ? n : 0;
  for (let i = 0; i < n; i++) {
    if (i < s.length) {
      infiniteString += s.substring(i, i + 1);
    } else {
      infiniteString += s.substring(i % s.length, (i % s.length) + 1);
    }
  }
  return (infiniteString.match(/a/g) || []).length;
}

console.log(repeatedString("x", 970770));
