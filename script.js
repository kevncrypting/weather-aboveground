// 
import API_TOKEN from "./config.js"

// create a reference to the form so that we can create an event listener for it later, also create a reference to the input by its ID so that we can access its value later
let form = document.querySelector('form');
let inputCity = document.getElementById('input-city');

// create a reference to the areas on the HTML page where we want to insert the information we get back from the Weather API
let cityName = document.getElementById('city-name');
let fahrenheitTemp = document.getElementById('current-temp-fah');
let celsiusTemp = document.getElementById('current-temp-cel');

let sunrise = document.getElementById('sunrise');
let sunset = document.getElementById('sunset');
let moonPhase = document.getElementById('moon-phase');

// create a variable that starts out as an empty string - in the body of the function, this will be dynamically changed to the value of the city inputted from the form
let cityInput = '';

// create an event listener for the form - on submit, do the following...
form.addEventListener('submit', (event) => {
    event.preventDefault(); // prevents page from automatically refreshing
    cityInput = inputCity.value; // takes the value of the input and sets it equal to our cityInput variable that we created outside of the function
    fetch(`http://api.weatherapi.com/v1/current.json?key=${API_TOKEN}&q=${cityInput}&aqi=no`) // changed the url to be contained in backticks so that we could replace the city with our variable within ${} syntax
        .then(response => response.json())
        .then(data => {
            cityName.innerText = data.location.name;
            fahrenheitTemp.innerText = `Current Temp (in Fahrenheit): ${Math.round(data.current.temp_f)} degrees`;
            celsiusTemp.innerText = `Current Temp (in Celsius): ${Math.round(data.current.temp_c)} degrees`;
        });
    fetch(`http://api.weatherapi.com/v1/astronomy.json?key=${API_TOKEN}&q=${cityInput}&dt=2023-03-30`)
        .then(response => response.json())
        .then(data => {
            sunrise.innerText = `Sunrise is at ${data.astronomy.astro.sunrise}.`
            sunset.innerText = `Sunset is at ${data.astronomy.astro.sunset}.`
            moonPhase.innerText = `Current moon phase is ${data.astronomy.astro.moon_phase}.`
        })
    inputCity.value = ``;
})



