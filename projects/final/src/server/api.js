module.exports.getResults = getResults;

const fetch = require("node-fetch");

async function getResults(place,from,to,ds_key,pb_key,gn_user){
    const {"lat":lat,"lng":lng,"countryCode":cc} =  await getGeoLocation(place,gn_user);
    const tsf = new Date(from).getTime()/1000;
    const tst = new Date(to).getTime()/1000;
    const tsA = Array(1+(tst-tsf)/(24*60*60)).fill(tsf).map((x,i)=>x+24*60*60*i);
    const pA = tsA.map(async ts=>getWeather(lat,lng,ts,ds_key));
    const [weather,picture] = await Promise.all([Promise.all(pA),getPicture(place,pb_key)]);
    const countdown = Math.ceil((new Date(from)-new Date())/(1000*24*60*60));
    return [weather,picture,countdown];
}

async function getGeoLocation(location,username) {
  try {
    const url =
      `http://api.geonames.org/searchJSON?q=${location}&maxRows=1&username=${username}`;
    return fetch(url)
      .then(res => {
        return res.json();
      })
      .then(json => {
        return (({lat,lng,countryCode})=>({lat,lng,countryCode}))(json["geonames"][0]);
      });
  } catch (error) {
    console.log(error);
  }
}

async function getWeather(lat,lng,time,key){
    try{
        const url = `https://api.darksky.net/forecast/${key}/${lat},${lng},${time}`;
        const w = await fetch(url)
          .then(async res => {
            return res.json();
          });
        return w['daily']['data'][0]['icon'];
      } catch (error) {
        console.log(error);
      }
}

async function getPicture(term,key){
    try{
        url = new URL("https://pixabay.com/api/");
        params = {"key":key,"q":term,"image_type":"photo","orientation":"horizontal","category":"places"};
        Object.entries(params).forEach(([k,v],i)=>url.searchParams.append(k,v));
        return await fetch(url.href).then(r=>r.json()).then(o=>o['hits'][0]['previewURL']);
    }catch(error){
        console.log(error);
    }
}