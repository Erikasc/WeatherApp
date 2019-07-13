import * as ELEMENTS from 'elements.js';
import {Http} from 'http.js';
import {Weather, WEATHER_PROXY_HANDLER} from 'weather-data.js';

const API = 'edd544c0b2c0451db0cb304abc61d8a6';


const colors = [
    '#FFFFFF',
    '#F06B4F',
    '#F2AE52',
    '#B0CD6D',
    '#A33120'
];
function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}


ELEMENTS.Element_SearchButton.addEventListener('click', searchWeather);
ELEMENTS.Element_SearchCity.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        ELEMENTS.Element_SearchButton.click();
    }
});

function searchWeather() {
    const CityName = ELEMENTS.Element_SearchCity.value.trim();
    if (CityName == 0) {
        return alert('Insert name of the city! ;)')
    }
    ELEMENTS.Element_LoadText.style.display = 'block';
    ELEMENTS.Element_WeatherBox.style.display = 'none';
    const URL = 'http://api.openweathermap.org/data/2.5/weather?q=' + CityName + '&units=metric&appid=' + API;

    Http.FetchData(URL)
        .then(responseData => {
            const WEATHER_DATA = new Weather(CityName.toUpperCase(), responseData.weather[0].description.toUpperCase(), responseData.main.temp, responseData.main.temp_min, responseData.main.temp_max, responseData.weather[0].icon, responseData.sys.country);
            const WEATHER_PROXY = new Proxy(WEATHER_DATA, WEATHER_PROXY_HANDLER);
            updateWeather(WEATHER_PROXY);
            console.log(responseData)
        })
        .catch(error => alert(error));
}

function updateWeather(weatherData) {
    console.log(weatherData);

    ELEMENTS.Element_WeatherCity.textContent = weatherData.cityName;
    ELEMENTS.Element_WeatherDescr.textContent = weatherData.description;
    ELEMENTS.Element_WeatherCountry.textContent = weatherData.country;
    ELEMENTS.Element_WeatherIcon.innerHTML = "<img style='width: 150px;' src='http://openweathermap.org/img/w/" +
        weatherData.icon + '.png' + "'>";

    ELEMENTS.Element_WeatherTemp.textContent = weatherData.temperature + '℃';
    ELEMENTS.Element_WeatherTemp_Min.textContent = '↓' + weatherData.temperatureMin + '℃';
    ELEMENTS.Element_WeatherTemp_Max.textContent = '↑' + weatherData.temperatureMax + '℃';


    ELEMENTS.Element_LoadText.style.display = 'none';
    ELEMENTS.Element_WeatherBox.style.backgroundColor = randomColor(colors);
    ELEMENTS.Element_WeatherBox.style.display = 'flex';

}





function showNowTime() {
    let date = new Date();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    let time = hour + ":" + minute + ":" + second + " ";
    ELEMENTS.Element_Time.textContent = time;

    setTimeout(showNowTime, 1000);
}

showNowTime();
