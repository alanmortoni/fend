
http://api.geonames.org/search?q=london&maxRows=10&username=
const geonamesUrl = 'http://api.geonames.org/searchJSON?formatted=true&q=';
const geonamesKey = 'fritscka';


let lat, lng, cc;
async function getGeoLocation(location) {
    try {
      const response = await fetch(endpoint);
      if (response.ok) {
        const location = {};
        const jsonRes = await response.json();
        lat = position.coords.latitude;
        lng = position.coords.longitude;
        cc = position.coords.countryCode;
        document.getElementById('latitude').textContent = lat.toFixed(2);
        document.getElementById('longitude').textContent = lngn.toFixed(2);
        document.getElementById('countryCode').textContent = cc;
        const api_url = geonamesUrl + location + '&username=' + geonamesKey + '&style=full';
        const response = await fetch(api_url);
        const json = await response.json();
        console.log(location);
        return location;
      }
    } catch (error) {
      console.log(error);
    }
  }

  Array.prototype.structure = function() {
    // from geonames readme: - P.PPL    populated place a city, town, village, or other agglomeration of buildings where people live and work
    return {
        _id: Number(this[0]),
        name: this[1],
        state: this[10],
        country: this[8],
        coordinates: [this[4], this[5]],
        timezone: this[17],
        is: ((this[6] == "P") ? true : false), // if object type is city.
        type: ((this[6] == "P") ? "city" : "other") // todo: add a parse function to parse other geonames db types
    }
}
  


