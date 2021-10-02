var locationName = document.getElementById('timezone');
var temperatureCurrent = document.getElementById('temp');
var presCurrent = document.getElementById('pressure');
var humidCurrent = document.getElementById('humid');
var dateToday = document.getElementById('date-today');
var windSpeed = document.getElementById('wind-speed');
var weatherIcon = document.getElementById('weather-icon');
var dailyWeather = document.getElementById('daily');
var weatherDescription = document.getElementById('weather-desc')

var apiKey = '7a30ed2e8548506280de567abd12e424';

var KELVIN = 273;

// To locate current position
// if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(showPosition);
// } else {
//     alert('Your browser does not support');
// }

// function showPosition(position) {
//     console.log('My location is:', position);
//     callWeatherApi (position);
// }

currentApi("Segambut");

function currentApi (position) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${position}&appid=${apiKey}`)
    .then(res => res.json())
    .then(data => {
        console.log('current city', data);
        var timezone = data.name;
        var humidity = data.main.humidity;
        var pressure = data.main.pressure;
        var temperature = data.main.temp - KELVIN;
        var windMeasure = data.wind.speed;
        var weatherImage = data.weather[0].icon;
        var weatherDesc = data.weather[0].description;
        var dateTime = moment().utc(data.dt).format('dddd, MMMM Do YYYY');
        var posLatitude = data.coord.lat;
        var posLongitude = data.coord.lon;

        dateToday.innerHTML = dateTime;
        locationName.innerHTML = timezone;
        temperatureCurrent.innerHTML = Math.ceil(temperature) + '°C';
        presCurrent.innerHTML = 'Pressure: ' + pressure + ' mb';
        humidCurrent.innerHTML = 'Humidity: ' + humidity + ' %';
        windSpeed.innerHTML = 'Wind speed: ' + windMeasure + ' km/h';
        weatherIcon.src = `http://openweathermap.org/img/wn/${weatherImage}.png`;
        weatherDescription.innerHTML = weatherDesc;

        callWeatherApi(posLatitude, posLongitude)
    })
}

function callWeatherApi (posLatitude, posLongitude) 
// function callWeatherApi (pos) 
{
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${posLatitude}&lon=${posLongitude}&appid=${apiKey}`)
    .then(res => res.json())
    .then(data => {
    console.log(data);

    var dayDate = [];
    var icon = [];
    var temperature = [];
    var mainWeather = [];
    var descWeather = [];
    var humidity = [];
    var pressure = [];
    var windMeasure = [];
    
//     var timezone = data.timezone;
//     var humidity = data.current.humidity;
//     var pressure = data.current.pressure;
//     var temperature = data.current.temp - KELVIN;
//     var windMeasure = data.current.wind_speed;
//     var weatherImage = data.current.weather[0].icon;
//     var weatherDesc = data.current.weather[0].description;
//     var dateTime = moment().utc(data.dt).format('dddd, MMMM Do YYYY');
//     console.log(weatherImage);
//     console.log(windMeasure);

//     dateToday.innerHTML = dateTime;
//     locationName.innerHTML = timezone;
//     console.log(locationName);
//     temperatureCurrent.innerHTML = Math.ceil(temperature) + '°C';
//     presCurrent.innerHTML = 'Pressure: ' + pressure + ' mb';
//     humidCurrent.innerHTML = 'Humidity: ' + humidity + ' %';
//     windSpeed.innerHTML = 'Wind speed: ' + windMeasure + ' km/h';
//     weatherIcon.src = `http://openweathermap.org/img/wn/${weatherImage}.png`;
//     weatherDescription.innerHTML = weatherDesc;
   
//    console.log(`Timezone: ${timezone}, Humidity: ${humidity}, Pressure: ${pressure}, Temperature: ${temperature}`);

   for (i = 0, j =1; i < 5; i++, j++) {

    var forecast = document.getElementsByClassName('forecast');

    mainWeather[i] = data.daily[j].weather[0].main;
    descWeather[i] = data.daily[j].weather[0].description;
    icon[i] = data.daily[j].weather[0].icon;
    dayDate = moment().add(j , 'day').format("dddd [<br>] Do MMM");
    temperature[i] = Math.ceil(data.daily[j].temp.day) - KELVIN;
    humidity[i] = data.daily[j].humidity;
    pressure[i] = data.daily[j].pressure;
    windMeasure[i] = data.daily[j].wind_speed;

    forecast[i].querySelectorAll('h2')[0].innerHTML = dayDate;
    forecast[i].querySelector('img').src = `http://openweathermap.org/img/wn/${icon[i]}@2x.png`
    document.getElementsByClassName('temp-forecast')[i].innerHTML = temperature[i] + '°C';
    document.getElementsByClassName('main-forecast')[i].innerHTML = mainWeather[i]; //querySelectorAll('h2')[2] doesn't work
    document.getElementsByClassName('desc-forecast')[i].innerHTML = descWeather[i];
    document.getElementsByClassName('humid-forecast')[i].innerHTML = 'Humidity: ' + humidity[i] + '%';
    document.getElementsByClassName('pres-forecast')[i].innerHTML = 'Pressure: ' + pressure[i] + 'mb';
    document.getElementsByClassName('wind-forecast')[i].innerHTML = `<i class="fa fa-wind"></i> ${windMeasure[i]} km/h` ;
    }
   });
}
// currentApi(Kuala Lumpur); // by default Kuala Lumpur (?)