// hello word express
import express from "express";
import binarySearch from "./binarySearch.js";
import bubbleSort from "./bubbleSort.js";

const port = 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`
          <h1>Busqueda de un elemento en un arreglo utilizando binarySearch</h1>
          <form action="/binarySearch" method="post">
            <input type="text" name="arr" value="1, 2, 4, 5, 6"/>
            <input type="text" name="target" value="2" />
            <button type="submit">binarySearch</button>
          </form>
          <h1>Ordenamiento de un arreglo utilizando bubbleSort</h1>
          <form action="/bubbleSort" method="post">
            <input type="text" name="arr" value="10, 35, 34, 9, 6"/>
            <button type="submit">bubbleSort</button>
          </form>
        `);
});

app.post("/binarySearch", (req, res) => {
  const { arr, target } = req.body;
  const formattedArr = arr.split(",").map((item) => parseInt(item));
  const result = binarySearch(formattedArr, +target);
  if (result === -1) {
    res.send(`El número ${target} no se encuentra en el arreglo`);
  } else {
    res.send(`El número ${target} se encuentra en el índice ${result}`);
  }
});

app.post("/bubbleSort", (req, res) => {
  const { arr } = req.body;
  const formattedArr = arr
    .split(",")
    .map((item) => parseInt(item))
    .filter((item) => !isNaN(item));

  const result = bubbleSort(formattedArr);
  res.send(`El arreglo ordenado es [${result}]`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
