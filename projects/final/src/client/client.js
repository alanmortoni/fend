function buildForm() {
  var element = document.createElement("div");
  var placeinput = document.createElement("input");
  var fromdateinput = document.createElement("input");
  fromdateinput.setAttribute("type","date");
  fromdateinput.value = new Date().toISOString().slice(0,10);
  var todateinput = document.createElement("input");
  todateinput.setAttribute("type","date");
  todateinput.value = new Date().toISOString().slice(0,10);
  var button = document.createElement("button");
  var result = document.createElement("div");
  element.append(placeinput,fromdateinput,todateinput,button,result);
  placeinput.value = "London";
  result.innerHTML = "Result goes here";
  button.innerText = "Submit";
  button.addEventListener("click", async e => {
    result.innerHTML = await getJunk(placeinput.value,fromdateinput.value,todateinput.value);
  });
  return element;
}


async function getJunk(place,from,to){
    const {"lat":lat,"lng":lng,"countryCode":cc} =  await getGeoLocation(place);
    console.log(JSON.stringify([lat,lng,cc]));
    const tsf = new Date(from).getTime()/1000;
    //console.log(JSON.stringify(await getWeather(lat,lng,tsf)));
    const tst = new Date(to).getTime()/1000;
    const tsA = Array(1+(tst-tsf)/(24*60*60)).fill(tsf).map((x,i)=>x+24*60*60*i);
    console.log(tsA);
    const pA = tsA.map(async ts=>getWeather(lat,lng,ts).then(w=>{
        const r = w['daily']['data'][0]['icon'];
        console.log(r);
        return r;
        }));
    const ret = await Promise.all(pA);
    return JSON.stringify(ret);
}

async function getGeoLocation(location, username = "fritscka") {
  try {
    const url =
      `http://api.geonames.org/searchJSON?q=${location}&maxRows=1&username=${username}`;
    return fetch(url)
      .then(res => {
        return res.json();
      })
      .then(json => {
        return (({lat,lng,countryCode})=>({lat,lng,countryCode}))(json["geonames"][0]);//[("lat", "lng", "countryCode")];
      });
  } catch (error) {
    console.log(error);
  }
}

async function getWeather(lat,lng,time){
    try{
        const url = `http://localhost:8000/weather/${lat},${lng},${time}`;
        return fetch(url)
            .then(res => {
                return res.json()
            })
            .then(json => {
                console.log(json);
                return json;
            })
    } catch (error){
        console.log(error);
    }
}

document.body.appendChild(buildForm());