// hello word express
import express from "express";
import os from "node:os";
import cluster from "node:cluster";
import jumpSearch from "./src/jumpSearch.js";
import linearSearch from "./src/linearSearch.js";
const port = 3000;

const spawnWorker = (i) =>
  new Promise((resolve) => {
    const worker = cluster.fork({ id: i });
    // debe esperar un segundo para que el proceso se inicie
    setTimeout(() => {
      resolve(worker);
    }, 1000);
  });

const primaryCode = async () => {
  const app = express();
  const cpuList = os.cpus();

  const workers = await Promise.all(
    [...Array(cpuList.length).keys()].map((i) => spawnWorker(i))
  );

  let busyWorkers = [];
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use((req, res, next) => {
    if (req.method === "GET" && req.path === "/") {
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
      return;
    }

    const worker = workers.find((worker) => !busyWorkers.includes(worker.id));
    busyWorkers.push(worker.id);

    worker.send({ path: req.path, method: req.method, body: req.body });

    worker.once("message", (message) => {
      // console.log("message", message);
      res.send(message);
      busyWorkers = busyWorkers.filter((id) => id !== worker.id);
    });
  });

  setInterval(() => {
    console.log("workers ocupados: 🔴", busyWorkers);
    console.log(
      "workers libres: 🟢",
      workers
        .filter((item) => !busyWorkers.includes(item.id))
        .map((item) => item.id)
    );
  }, 1000);

  app.listen(port, () => {
    console.log(`Server running on port ${port} and process ${process.pid}`);
  });
};

const workerCode = () => {
  process.on("message", ({ path, body, method }) => {
    // console.log("worker", process.pid, "recibió mensaje", path, body, method);
    if (path === "/jumpSearch") {
      const { arr, target } = body;
      const formattedArr = arr.split(",").map((item) => parseInt(item));
      const result = jumpSearch(formattedArr, +target);
      process.send(`El número ${target} se encuentra en el índice ${result}`);
    }
    if (path === "/linearSearch") {
      const { arr, target } = body;
      const formattedArr = arr.split(",").map((item) => parseInt(item));

      const result = linearSearch(formattedArr, +target);
      process.send(`El número ${target} se encuentra en el índice ${result}`);
    }

    process.send({ path, body, method });
  });
};

if (cluster.isPrimary) {
  primaryCode();
} else {
  workerCode();
}
