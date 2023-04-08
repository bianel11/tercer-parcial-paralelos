// hello word express
const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("Hello World! Primer Pod!"));

function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;
    }
  }
  return -1;
}

function jumpSearch(arr, target) {
  const n = arr.length;
  let step = Math.floor(Math.sqrt(n));
  let prev = 0;

  while (arr[Math.min(step, n) - 1] < target) {
    prev = step;
    step += Math.floor(Math.sqrt(n));
    if (prev >= n) {
      return -1;
    }
  }

  while (arr[prev] < target) {
    prev++;
    if (prev === Math.min(step, n)) {
      return -1;
    }
  }

  if (arr[prev] === target) {
    return prev;
  }

  return -1;
}

app.get("/jumpSearch", (req, res) => {
  const arr = [1, 3, 5, 7, 9];
  const target = 5;
  const result = jumpSearch(arr, target);
  res.send(`El número ${target} se encuentra en el índice ${result}`);
});

app.get("/linearSearch", (req, res) => {
  const arr = [1, 3, 5, 7, 9];
  const target = 5;
  const result = linearSearch(arr, target);
  res.send(`El número ${target} se encuentra en el índice ${result}`);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
