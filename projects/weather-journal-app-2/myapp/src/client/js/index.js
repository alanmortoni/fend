
const express = require('express')
const app = express();

import {getGeoLocation} from './request';

const geoLocation = await getGeoLocation(trip.city);

trip.latitude = geoLocation.latitude;
trip.longitude = geoLocation.longitude;
trip.countryCode = geoLocation.countryCode;

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});

console.log('Entry point is setup');

import './styles/resets.scss'
import './styles/style.scss'


function startTimer(duration, display) {
  var timer = duration, minutes, seconds;
  setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds;

      if (--timer < 0) {
          timer = duration;
      }
  }, 1000);
}

