//const ar = [4, 5, 5, 5, 6, 6, 4, 1, 4, 4, 3, 6, 6, 3, 6, 1, 4, 5, 5, 5];
//let n = ar.length;
function sockMerchant(n, ar) {
  let frequency = new Array(Math.max(...ar) + 1).fill(0);
  ar.map((sock) => frequency[sock]++);
  let total = 0;
  frequency = frequency.filter((f) => f && f >= 2);
  let pairs = [];
  frequency.map((f) => {
    pairs.push(parseInt(f / 2));
  });

  pairs.map((p) => (total += p));
  return total;
}

//console.log(sockMerchant(n, ar));
