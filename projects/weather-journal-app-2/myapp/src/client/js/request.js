import { readSync } from "fs";

export async function getGeoLocation(location, username = "fritscka") {
  try {
    const url =
      "http://api.geonames.org/searchJSON?q=${location}&maxRows=1&username=${username}";
    return fetch(url)
      .then(res => {
        return res.json();
      })
      .then(json => {
        return json["geonames"][0][("lat", "lng", "countryCode")];
      });
  } catch (error) {
    console.log(error);
  }
}
