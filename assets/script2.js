//search button
const searchEl = document.querySelector("#search-btn");
//seach bar
const searchLine = document.querySelector("#city-search");
//declaring my API key for the website
const apiKey = "20368bb379fe63aed5f9f2f6a9a9ff61";
const apiKey2 = "a154f728242f9fcc90bbd015b0e30c82";
//container for past search buttons
const forecastZone = document.querySelector("#five-day");
const todayWeatherEl = document.querySelector("#todays-weather");
const cityButtonsEl = document.querySelector("#city-buttons");

//set the limit, days, and units to be used in API looups.
let limit = 5;
let days = 5;
let units = "metric";

//check local storage for past city name searches
const pastLocations = localStorage.getItem("pastLocations") || [];
console.log(pastLocations); //logging ot check

//search city submit
const formSubmitHandler = function (event) {
  //prevent default action of refresh
  event.preventDefault();

  //logging the seached item.
  console.log(searchLine.value.trim());

  const tempCity = searchLine.value.trim();

  //check to make sure theres data in there
  if (tempCity) {
    //storing the city name temporarily, incase it is not capitalized
    const tempCity = searchLine.value.trim();

    //function to turn it to title case
    function toTitleCase(str) {
      return str.replace(
        /\w\S*/g,
        (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
      );
    }

    //logging to check that capitalization worked
    console.log(`"${tempCity}" becomes "${toTitleCase(tempCity)}"`);

    //changing the real variable to the capitalized version
    const city = tempCity;

    const lS = localStorage.getItem("pastLocations") || [];
    if (ls) {
        
    }
    const pastLocations = JSON.parse(localStorage.getItem("pastLocations"));

    //add city to the array of past searches
    pastLocations.push(city);
   
    //triggering storing the object to localStorage
    localStorage.setItem("pastLocations", JSON.stringify(pastLocations));

    //logging to check
    console.log(city);

    //clear search
    searchEl.value = "";

    //call the citySearch function
    citySearch(city);
    renderButtons(pastLocations);

    //or if theres an error
  } else {
    alert("Please enter a real city");
  }
};

// for clicking past search city buttons
const buttonClickHandler = function (event) {
  //this will always be the capitalized version becuase it isnt saved as city till after that funciton
  //checks the event buttons id for the city name
  const city = event.target.getAttribute("id");

  //if theres info there it will search for it
  if (city) {
    //calls the city search function
    citySearch(city);

    //clears data
    // forecastZone.textContent = "";
    // todayWeatherEl.textContent = "";
  }
};

//uses api to get city info
const citySearch = function (city) {
  //api url with our variables in it
  const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}}&limit=5&appid=${apiKey}`;

  //fetches the api info
  fetch(apiUrl)
    //once this happens....
    .then(function (response) {
      //if the response is ok...
      if (response.ok) {
        //turn it into json then...
        response.json().then(function (data) {
          //log the data out so i can look through it
          console.log(data);

          //get the bits of the data that i need (specifically the longitude adn latitude of the city)
          for (const location of data) {
            //stores the needed info into an object
            const newLocation = {
              country: location.country,
              city: location.name,
              lon: location.lon,
              lat: location.lat,
            };
            //log to check
            console.log(newLocation);
            //call the get weather functions that require the lat/lon
            getTodaysWeather(newLocation);
            // getForecast(newLocation);
            //idk why i'm returning this actually
            return newLocation;
          }
        });
      } else {
        //error message if sometjig happened
        alert(`Error:${response.statusText}`);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to weaether api");
    });
};

//function to get TODAYs weather
const getTodaysWeather = function (newLocation) {
  //apiURL with our variables
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${newLocation.lat}&lon=${newLocation.lon}&appid=${apiKey}&units=${units}`;
  //get api then...
  fetch(apiUrl).then(function (response) {
    //check response...
    if (response.ok) {
      ///then get data
      response.json().then(function (data) {
        //call display TODAYs weather function
        const locationData = newLocation;
        displayTodaysWeather(data, locationData);
        //log so i can look though the data to see what i need
        console.log(data);
      });
    } else {
      alert(`Error:${response.statusText}`);
    }
  });
};

//function to display TODAYs weather
const displayTodaysWeather = function (data, locationData) {
  //declare needed variables
  const temp = data.main.temp;
  const humidity = data.main.humidity;
  const wind = data.wind.speed;
  const iconId = data.weather[0].icon;
  const desc = data.weather[0].description;
  const iconUrl = `https://openweathermap.org/img/wn/${iconId}@2x.png`;
  const day = dayjs().format("ddd, MMM D, YYYY");

  //log to check
  console.log(`
    temperature: ${temp}
    humidity:${humidity}
    wind: ${wind}
    desc: ${desc}
    `);

  //locate the elements on the page I want to change data on
  const locName = document.querySelector("#searched-city");
  const locDesc = document.querySelector("#today-desc");
  const locTemp = document.querySelector("#today-temp");
  const locWind = document.querySelector("#today-wind");
  const locHum = document.querySelector("#today-hum");
  const image = document.querySelector("#today-icon");
  const imageParent = document.querySelector("#image-container");

  //set image info based on data
  image.className = "weather-icon";
  image.src = iconUrl;
  imageParent.appendChild(image); //adds image to page

  //fill all feilds needed for todays weather
  locName.textContent = `${data.name} on ${day}`;
  locDesc.textContent = `Weather is: ${data.weather[0].description}`;
  locTemp.textContent = `Tempterature: ${temp} °C`;
  locWind.textContent = `Wind: ${wind} m/s`;
  locHum.textContent = `Humidity: ${humidity}%`;

  getForecast(locationData);
};

//function to get forecast
const getForecast = function (locationData) {
  //api url with our variables
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${locationData.lat}&lon=${locationData.lon}&appid=${apiKey}&units=${units}`;

  //log to check it
  console.log(`FORCAST API URL: ${apiUrl}`);

  //get api then...
  fetch(apiUrl).then(function (response) {
    //repose./,,
    if (response.ok) {
      //then JSON the data
      response.json().then(function (data) {
        //log to check
        console.log(data);

        //call the displayForcast function
        displayForecast(data);
      });
    } else {
      alert(`Error:${response.statusText}`);
    }
  });
};

//forcast display function
const displayForecast = function (data) {
  //loop for the whole array (5 days)
  const refinedDays = [];
  for (let i = 0; i < data.list.length; i++) {
    if (data.list[i].dt_txt.includes("12:00:00")) {
      refinedDays.push(data.list[i]);
    }
  }
  console.log(refinedDays);

  for (let i = 0; i < refinedDays.length; i++) {
    const dayCast = {
      temp: refinedDays[i].main.temp,
      humidity: refinedDays[i].main.humidity,
      desc: refinedDays[i].weather[0].description,
      iconId: refinedDays[i].weather[0].icon,
      wind: refinedDays[i].wind.speed,
      date: refinedDays[i].dt_txt,
    };
    //log to check
    console.log(dayCast);

    //get page info
    const nextTemp = document.querySelector(`#temp${i}`);
    const nextWind = document.querySelector(`#wind${i}`);
    const nextHum = document.querySelector(`#hum${i}`);
    const nextDesc = document.querySelector(`#desc${i}`);
    const nextIcon = document.querySelector(`#icon${i}`);
    const nextIconParent = document.querySelector(`#image-container${i}`);
    const nextDate = document.querySelector(`#date${i}`);
    //fill in forecast info 
    nextDate.textContent = dayjs(dayCast.date).format("ddd, MMM D");
    nextDate.className = "rowdies-bold p-2";
    nextTemp.textContent = `Tempterature: ${dayCast.temp} °C`;
    nextWind.textContent = `Wind: ${dayCast.wind} m/s`;
    nextHum.textContent = `Humidity: ${dayCast.humidity}%`;
    nextDesc.textContent = dayCast.desc;
    //special weather icon info
    const nextIconUrl = `https://openweathermap.org/img/wn/${dayCast.iconId}@2x.png`;
    nextIcon.className = "weather-icon";
    nextIcon.src = nextIconUrl;
    nextIconParent.appendChild(nextIcon); //adds image to page
  }
};

const renderButtons = function (pastLocations){
    pastLocations.forEach(location => {
        const cityButton = $('<button>').addClass('city-button').text(location).attr('id', location)
        
        cityButtonsEl.append(cityButton);
    });
}

//event listener
searchEl.addEventListener("click", formSubmitHandler);
cityButtonsEl.addEventListener("click", buttonClickHandler);
