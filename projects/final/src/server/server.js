const express = require("express");const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");app.use(cors());
const fetch = require("node-fetch");
const api = require("../api/api");
const dotenv = require("dotenv");dotenv.config();

console.log(`Your API key is ${process.env.DS_KEY}`);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(express.static("./src/client/"));

app.get("/", (req, res, next) => {
  res.sendfile("./src/client/index.html");
});

app.get("/api", (req, res, next) => {
  try {
    api
      .getResults(
        req.query.place,
        req.query.from,
        req.query.to,
        process.env.DS_KEY,
        process.env.PB_KEY,
        process.env.GN_USER
      )
      .then(r => res.send(JSON.stringify(r)));
  } catch (error) {
    console.log(error);
  }
});

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`CORS-enabled web server listening on port ${PORT}!`);
});

//EJS Setup
app.set("view engine", "ejs");
