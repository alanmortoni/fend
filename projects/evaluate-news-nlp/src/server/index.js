var aylien = require("aylien_textapi");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

console.log(`Your API key is ${process.env.API_KEY}`);
// set aylien API credentias //
var textapi = new aylien({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY
});

const express = require("express");
var path = require("path");
const mockAPIResponse = require("./mockAPI.js");

const app = express();
app.use(bodyParser.json());
app.use(express.static("dist"));

console.log(__dirname);

app.get("/", function(req, res) {
  res.sendFile("dist/index.html");
});

// designates what port the app will listen to for incoming requests
app.listen(8080, function() {
  console.log("Example app listening on port 8080!");
});

app.get("/test", function(req, res) {
  res.send(mockAPIResponse);
});

app.post("/sentiment", (req, res) => {
  textapi.sentiment({ text: req.body.text}, (error, response) => {
    res.send(response);
  });
});
