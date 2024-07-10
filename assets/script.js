// https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

const searchEl = $("search-btn");

//declaring my API key for the website
const apiKey = "20368bb379fe63aed5f9f2f6a9a9ff61";
// other api key : a154f728242f9fcc90bbd015b0e30c82

let city = "montreal";
let country = "CA";
let limit = 5;

let days = 5;
let units = "metric";

// let newURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&limit=${limit}&appid=${apiKey}`;
let newURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}}&limit=${limit}&appid=${apiKey}`;

//check local storage for past city name searches
const pastLocations = localStorage.getItem("pastLocations") || [];

console.log(newURL);

//http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

function getApi() {
  fetch(newURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Use the console to examine the response
      console.log(data);

      for (const location of data) {
        //long and lat hopefully

        const newLocation = {
          lon: location.lon,
          lat: location.lat,
        };
        console.log(`
        lon: ${newLocation.lon} 
        lat: ${newLocation.lat}
        `);
        return newLocation;
      }
      //   getCurrentWeather();
    });
}

function recordResponse(event) {
  event.preventDefault();

  const lS = localStorage.getItem("pastLocations") || [];
  const pastLocations = JSON.parse(lS);

  let city = $("city-search").val();
  console.log(city);

}
function storeData(){
    if(city){
        pastSearches.push(city);
        
        localStorage.setItem("pastLocations", json.stringify(pastLocations));
    }




}

getApi(newURL);

searchEl.on("submit", recordResponse);
