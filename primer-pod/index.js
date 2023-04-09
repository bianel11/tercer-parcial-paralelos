import express from "express";
import jumpSearch from "./jumpSearch.js";
import linearSearch from "./linearSearch.js";

const port = 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`
  <form action="/jumpSearch" method="post">
    <input type="text" name="arr" />
    <input type="text" name="target" />
    <button type="submit">jumpSearch</button>
  </form>
  <form action="/linearSearch" method="post">
    <input type="text" name="arr" />
    <input type="text" name="target" />
    <button type="submit">linearSearch</button>
  </form>
`);
});

app.post("/jumpSearch", (req, res) => {
  const { arr, target } = req.body;
  const formattedArr = arr.split(",").map((item) => parseInt(item));
  const result = jumpSearch(formattedArr, +target);
  if (result === -1) {
    res.send(`El número ${target} no se encuentra en el arreglo`);
  } else {
    res.send(`El número ${target} se encuentra en el índice ${result}`);
  }
});

app.post("/linearSearch", (req, res) => {
  const { arr, target } = req.body;
  const formattedArr = arr.split(",").map((item) => parseInt(item));
  const result = linearSearch(formattedArr, +target);
  if (result === -1) {
    res.send(`El número ${target} no se encuentra en el arreglo`);
  } else {
    res.send(`El número ${target} se encuentra en el índice ${result}`);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
