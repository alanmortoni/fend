const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());

const dotenv = require('dotenv');
dotenv.config();

console.log(`Your API key is ${process.env.API_KEY}`);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.use(express.static('./dist'));

app.get('/', (req, res, next) => {
  res.status(200).send('./dist/index.html');
})


const PORT = 8000;

app.listen(PORT, () => {
  console.log(`CORS-enabled web server listening on port ${PORT}!`);
})

//EJS Setup
app.set('view engine', 'ejs')
