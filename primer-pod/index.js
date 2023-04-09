import express from "express";
import jumpSearch from "./jumpSearch.js";
import linearSearch from "./linearSearch.js";

const port = 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`
  <h1>Busqueda de un elemento en un arreglo utilizando jumpSearch</h1>
  <form action="/jumpSearch" method="post">
    <input type="text" name="arr" value="1, 2, 3, 5, 6, 7" />
    <input type="text" name="target" value="2" />
    <button type="submit">jumpSearch</button>
  </form>
  <h1>Busqueda de un elemento en un arreglo utilizando linearSearch</h1>
  <form action="/linearSearch" method="post">
    <input type="text" name="arr" value="1, 2, 3, 4, 5" />
    <input type="text" name="target" value="2" />
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
