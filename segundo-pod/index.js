// hello word express
const express = require("express");
const app = express();
const port = 3001;

function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}

app.get("/binarySearch", (req, res) => {
  const arr = [1, 3, 5, 7, 9];
  const target = 5;
  const result = binarySearch(arr, target);
  res.send(`El número ${target} se encuentra en el índice ${result}`);
});

function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

app.get("/bubbleSort", (req, res) => {
  const arr = [9, 7, 5, 3, 1];
  const result = bubbleSort(arr);
  res.send(`El arreglo ordenado es [${result}]`);
});

app.get("/", (req, res) => res.send("Hello World! Segundo pod!"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
