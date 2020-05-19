let s = "DDUUDDUDUUUD";
let n = s.split("").length;
function countingValleys(n, s) {
  let level = 0;
  let steps = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    level += s.split("")[i] === "U" ? 1 : -1;
    steps[i] = level;
  }
  let valleyCount = 0;
  console.log(steps);
  for (let i = 0; i < steps.length - 1; i++) {
    if (
      (steps[i] === 0 && steps[i + 1] === -1) ||
      (steps[i] === -1 && steps[i + 1] === 0)
    ) {
      valleyCount++;
    }
  }
  return valleyCount;
}
console.log(countingValleys(n, s));
