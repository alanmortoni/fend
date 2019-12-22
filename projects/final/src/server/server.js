const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());

const dotenv = require("dotenv");
dotenv.config();

console.log(`Your API key is ${process.env.API_KEY}`);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(express.static("./src/client"));

app.get("/", (req, res, next) => {
  res.sendfile("./src/client/index.html");
});

app.get("/weather/:latlng", (req, res, next) => {
  try {
    const url = `https://api.darksky.net/forecast/${process.env.API_KEY}/${req.params.latlng}`;
    console.log(url);
    fetch(url)
      .then(async res => {
        return res.json();
      })
      .then(async json => {
        res.send(JSON.stringify(json));
      });
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
