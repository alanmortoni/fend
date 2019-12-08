const express = require('express');
var aylien = require("aylien_textapi");
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require("dotenv");

dotenv.config();
console.log(`Your API key is ${process.env.API_KEY}`);


// set aylien API credentias //
var textapi = new aylien({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY
});

textapi.sentiment({
  'text': 'John is a very good football player!'
}, function(error, response) {
  if (error === null) {
    console.log(response);
  } else console.log("xyxyzzz")
});

var path = require("path");

const mockAPIResponse = require("./mockAPI.js");

const app = express();
app.use(bodyParser.json())
app.use(express.static("dist"));

console.log(__dirname);

app.get("/", function(req, res) {
  res.sendFile("dist/index.html");
});

app.get("/api", (req, res) => {
  textapi.sentiment({ 'text': "I like potatoes" }, (error, response) => {
    res.send(response);
  });
});

app.post("/api",(req,res)=>{
  textapi.sentiment(req.body.text,(error,response)=>{
    console.log(response);
    res.send(JSON.stringify(response));
  })
});

// designates what port the app will listen to for incoming requests
app.listen(8080, function() {
  console.log("Example app listening on port 8080!");
});

app.get("/test", function(req, res) {
  res.send(mockAPIResponse);
});

app.post('/sentiment', (req, res, next) => {
  if(req.body.text !== " ") {
    const text = req.body.text;
    textapi.sentiment({
      'text': text
    }, function (error, response) {
      if (error === null) {
        res.status(201).send(response);
      }
    });
  } else {
    res.status(400).json('Bad Request');
  }
})