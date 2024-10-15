const { createServer } = require("node:http");
const { v4: uuidv4 } = require("uuid");

const users = [
  { id: uuidv4(), name: "hello" },
  { id: uuidv4(), name: "hello2" },
];

const hostname = "127.0.0.1";
const PORT = process.env.PORT || 3000;

const routes = {};

const requestHandler = (req, res) => {
  const routeHandler = routes["api/users"];

  routeHandler(req, res);
};

class App {
  listen() {
    const server = createServer((req, res) => {
      requestHandler(req, res);
    });

    server.listen(PORT, hostname, (err) => {
      if (err) {
        return console.error(`Error starting server: ${err.message}`);
      }

      console.log(`Server running at http://${hostname}:${PORT}/`);
    });
  }

  get(path = "", handler) {
    routes[path] = handler;
  }
}

const app = new App();

app.listen();

app.get("api/users", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(users));
});
