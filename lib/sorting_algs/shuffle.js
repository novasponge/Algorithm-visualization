export const shuffle = (arr) => {
  let n = arr.length, t, i;
  let traces = [];
  while(n) {
    i = Math.random() * n-- | 0;
    t = arr[n];
    arr[n] = arr[i];
    arr[i] = t;
    traces.push(["swap", n, i]);
  }
  return traces;
};
