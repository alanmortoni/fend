// Setup empty JS object to act as endpoint for all routes
const projectData = [];

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Spin up the server// Callback to debug
const port = 8000;
const server = app.listen(port, function () {
    console.log(`running on localhost: ${port}`);
});

// Callback function to complete GET '/all'
app.get('/all', function (req, res) {
    res.send(projectData);
});

// Post route
app.post('/addData', function (req, res) {
    projectData.push(req.body);
    res.send('Success!');
})

// Alternative POST route
/* app.post('/add', function (req, res) {
    newEntry = {
        temperature: request.body.temperature,
        date: request.body.date,
        userResponse: request.body.userResponse
    };

    projectData.unshift(newEntry);
}); */


  
  