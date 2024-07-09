// https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

//declaring my API key for the website
const apiKey = '20368bb379fe63aed5f9f2f6a9a9ff61';
let city = "montreal";
let country = "CA";
let limit = 5;

let days = 5;
let units = "metric";

let newLocation = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&limit=${limit}&appid=${apiKey}`;

console.log(newLocation);

//http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

function getApi(requestUrl) {
    fetch(requestUrl)
      .then(function (response) {
        // Check the console first to see the response.status
        console.log(response.status);
        let lon = response.lon;
        let lat = response.lat;   
        
        console.log(lon+lat);
  
        // Then write the conditional based on that response.status value
        // Make sure to display the response on the page
        if (response.status !== 200) {
  
        //   responseText.textContent = response.status;
          
        } 
  
      })
      .then(function (data) {
        console.log(data);
      });
  }
  
  getApi(newLocation);
  