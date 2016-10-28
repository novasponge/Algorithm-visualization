const swap = (arr, i, j, traces) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
  traces.push(["swap", arr[i].pos, arr[j].pos, "Sorting"]);
};

export const selectionSort = (arr) => {
  const traces = [];
  sort(arr, traces);
  return traces;
};

function sort(arr, traces) {
  const length = arr.length;
  for (let i = 0; i < length; i++) {
    let min = i;
    for (let j = i+1; j < length; j++) {
      traces.push(["compare", arr[j].pos, arr[min].pos, "Sorting"]);
      if (arr[j].pos < arr[min].pos) {
        min = j;
      }
    }
    swap(arr, i, min, traces);
  }
}
