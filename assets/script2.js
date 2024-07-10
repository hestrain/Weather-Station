//search button
const searchEl = document.querySelector("#search-btn");
const searchLine = document.querySelector("#city-search");
//declaring my API key for the website
const apiKey = "20368bb379fe63aed5f9f2f6a9a9ff61";
// other api key : a154f728242f9fcc90bbd015b0e30c82
//container for past search buttons
//const forecast = document.querySelector("#5-day"); // need to change to my own code
const cityButtonsEl = document.querySelector("#city-buttons");

// let city = "montreal";
// let country = "CA";
let limit = 5;

let days = 5;
let units = "metric";

// let newURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&limit=${limit}&appid=${apiKey}`;
//let newURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}}&limit=${limit}&appid=${apiKey}`;

//check local storage for past city name searches
// const pastLocations = json.parse(localStorage.getItem("pastLocations")) || [];

console.log(searchEl);
console.log(searchLine);

// console.log(newURL);

//search city submit
const formSubmitHandler = function (event) {
  event.preventDefault();

  console.log(searchLine.value.trim());

  const city = searchLine.value.trim();

  console.log(city);

  //   if (city) {
  //     citySearch(city);

  //     repoContainerEl.textContent = "";
  //     nameInputEl.value = "";
  //   } else {
  //     alert("Please enter a GitHub username");
  //   }
  citySearch(city);
};

//will be for clicking past search city buttons
const buttonClickHandler = function (event) {
  const city = event.target.getAttribute("id");

  if (city) {
    citySearch(city);

    // repoContainerEl.textContent = "";
  }
};

//uses api to get city info
const citySearch = function (city) {
  const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}}&limit=5&appid=${apiKey}`;

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);

          for (const location of data) {
            //long and lat hopefully

            const newLocation = {
              lon: location.lon,
              lat: location.lat,
              country: location.country,
            };
            console.log(newLocation);

            getTodaysWeather(newLocation);
            getForecast(newLocation);
            return newLocation;
          }
        });
      } else {
        alert(`Error:${response.statusText}`);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to weaether api");
    });
};

const getTodaysWeather = function (newLocation) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${newLocation.lat}&lon=${newLocation.lon}&appid=${apiKey}&units=${units}`;
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayTodaysWeather(data);

        console.log(data);
      });
    } else {
      alert(`Error:${response.statusText}`);
    }
  });
};

const displayTodaysWeather = function (data) {
  const temp = data.main.temp;
  const humidity = data.main.humidity;
  const wind = data.wind.speed;

  console.log(`
    temperature: ${temp}
    humidity:${humidity}
    wind: ${wind}
    `);
const locName = document.querySelector("#searched-city");
const locTemp = document.querySelector("#today-temp");
const locWind = document.querySelector("#today-wind");
const locHum = document.querySelector("#today-hum");

locName.textContent = data.name;
locTemp.textContent = `Tempterature: ${temp} degrees celcius`;
locWind.textContent = `Wind: ${wind} ?units`;
locHum.textContent = `Humidity: ${humidity}%`;

};

const getForecast = function (newLocation) {
    const apiUrl = `api.openweathermap.org/data/2.5/forecast/daily?lat=${newLocation.lat}&lon=${newLocation.lon}&appid=${apiKey}&units=${units}`;
   
    fetch(apiUrl).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayForecast(data);
  
          console.log(data);
        });
      } else {
        alert(`Error:${response.statusText}`);
      }
    });
  };
  
  const displayForecast = function (data) {


// for (const day of data) {
 
//     const temp = data.main.temp; //redo these
//     const humidity = data.main.humidity;
//     const wind = data.wind.speed;
  
//     console.log(`
//       temperature: ${temp}
//       humidity:${humidity}
//       wind: ${wind}
//       `);
//   const locTemp = document.querySelector("#today-temp");
//   const locWind = document.querySelector("#today-wind");
//   const locHum = document.querySelector("#today-hum");
  
//   locName.textContent = data.name;
//   locTemp.textContent = `Tempterature: ${temp} degrees celcius`;
//   locWind.textContent = `Wind: ${wind} ?units`;
//   locHum.textContent = `Humidity: ${humidity}%`;
// }
  
  };





//event listener
searchEl.addEventListener("click", formSubmitHandler);
cityButtonsEl.addEventListener("click", buttonClickHandler);
