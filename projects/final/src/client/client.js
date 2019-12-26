import './styles.scss';

function buildForm() {
  const br = function(){return document.createElement("br");};
  var inputDiv = document.createElement("div");
    inputDiv.classList.add("inputDiv")
  var placeinput = document.createElement("input");
    placeinput.classList.add("placeinput");
    placeinput.value = "London";
  var fromdateinput = document.createElement("input");
    fromdateinput.setAttribute("type","date");
    fromdateinput.value = new Date().toISOString().slice(0,10);
    fromdateinput.classList.add("dateinput");
  var todateinput = document.createElement("input");
    todateinput.setAttribute("type","date");
    todateinput.value = new Date().toISOString().slice(0,10);
    fromdateinput.classList.add("dateinput");
  var button = document.createElement("button");
    button.innerText = "Submit";
  inputDiv.append(placeinput,br(),fromdateinput,br(),todateinput,br(),button);
  
  var resultDiv = document.createElement("div");
    resultDiv.classList.add("resultDiv");
  var picture = document.createElement("img");
    picture.classList.add("picture");
  var countdown = document.createElement("div");
    countdown.classList.add("countdown");
  var weather = document.createElement("div");
    weather.classList.add("weather");
  resultDiv.append(picture,br(),weather,br(),countdown);
  
  button.addEventListener("click", async e => {
      var days;
      [days,picture.src,countdown.innerText] = await getResults(placeinput.value,fromdateinput.value,todateinput.value);
      weather.innerHTML = "";
      days.forEach(s=>{
        const day = document.createElement('p');
        day.innerText=s;
        day.classList.add("day")
        weather.appendChild(day);
        });
  });
  return [inputDiv,resultDiv];
}

async function getResults(place,from,to){
    try{
        const url = new URL("/api",document.location.origin);
        const params = {place:place,from:from,to:to};
        Object.entries(params).forEach(([k,v],i)=>url.searchParams.append(k,v));
        return await fetch(url.href).then(r=>r.json());
    } catch (error){
        console.log(error);
    }
}

document.body.append(...buildForm());