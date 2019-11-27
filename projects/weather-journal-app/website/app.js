// Personal API Key for OpenWeatherMap API
let appID = "8a0fd8eb79fa61066c0c54afcae314a1";
let baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";


// Event listener to add function to existing HTML DOM element
document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    document.getElementById("generate").addEventListener("click", performAction);
    updateOne('/first');
});


/* Function called by event listener */
function performAction(event) {
  console.log("generate");
  const zipCode = document.getElementById("zip").value;
  const userResponse = document.getElementById("feelings").value;
  getWeatherData(baseURL, zipCode, appID).then(function(data) {
    date_str = new Date(data.dt*1000).toDateString();
    postData("/addData", {
      temperature: data.main.temp,
      date: date_str,
      userResponse: userResponse
    });
    updateOne("/last");
  });
}

/* Function to GET Web API Data*/
const getWeatherData = async (baseURL, zipCode, appID) => {
  const res = await fetch(baseURL + zipCode + "&appID=" + appID);
  try {
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("error", error);
  }
};
/* Function to POST data */
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  try {
    const newData = await response.text();//.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

/* Function to GET Project Data */
const updateUI = async (url = "") => {
  const req = await fetch(url);
  try {
    const allData = await req.json();
    lastdata = allData.pop();
    document.getElementById("date").innerHTML = lastdata.date;
    document.getElementById("temp").innerHTML = lastdata.temperature;
    document.getElementById("content").innerHTML = lastdata.userResponse;
  } catch (error) {
    console.log("error", error);
  }
};

const updateOne = async (url='') => {
  const req = await fetch(url);
  try{
    const data = await req.json();
    document.getElementById("date").innerHTML = data.date;
    document.getElementById("temp").innerHTML = data.temperature;
    document.getElementById("content").innerHTML = data.userResponse;
  } catch (error) {
    console.log("error", error);
  }
};