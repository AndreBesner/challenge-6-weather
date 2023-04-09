$(document).ready(function(){


    // Print the last 5 searches as list items
    let previousSearchContainer = $("#previous-search-container");
    function printLastSearches(){
        for(let i = localStorage.length - 1 ; i >= localStorage.length - 6 ; i -- ){
            let key = localStorage.key(i);
            console.log(localStorage.getItem(key));
            let makeListItem = document.createElement('li');
            makeListItem.innerHTML = localStorage.getItem(key);
            previousSearchContainer.append(makeListItem);
        }
    }

    printLastSearches();


    let cityName = $("#city-name");
    
    $("#city-name-input").submit(function (e) { 
        e.preventDefault(); // stops page from refreshing

        let city = $("#city-name").val().trim(); // saves entered name to variable
        console.log(city)

        let storageKey = "userText.." + Date.now(); // sets a key for individual local storage
        localStorage.setItem(storageKey, city); // sets each search term to local storage

        getLongLat(city); // passes city text on to api call idek how but it works with gibberish

        

        cityName.val(""); // clears text in box

        //

    });



    const latLongAPIUrl = "http://api.openweathermap.org/geo/1.0/direct?q="
    const apiKey = "4790ded9cd9c563d5479fc18a7479e30"
    function getLongLat(data){
        // console.log(data);
        let latLongUrl = latLongAPIUrl + data + "&appid=" + apiKey;
        fetch(latLongUrl)
        .then(function(response){
            return response.json();
        })
        .then(function (data) {
        //    console.log(data);
        //    console.log(data[0].lat);
           let lat = data[0].lat;
        //    console.log(lat);
        //    console.log(data[0].lon);
           let lon = data[0].lon;
        //    console.log(lon);
           getWeather(lat, lon);
        })
    }

    // an object to hold the weather data that is global
    let weatherDataToday = {};
    // another object for 5 day lol
    let weatherDataFiveDay = {
        day : []
    } ;
    const getWeatherAPIUrl = "http://api.openweathermap.org/data/2.5/forecast?"
    function getWeather(latitude, longitude){
        let getWeatherUrl = getWeatherAPIUrl + "lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey + "&units=metric";
        console.log(getWeatherUrl);
        fetch(getWeatherUrl)
        .then(function(response){
            return response.json();
        })
        .then(function (data){
            console.log(data);
            console.log(data.city.name); // wow
            // weatherDataToday.temperature = data.weather[0].description;
            console.log(data.list[0].weather[0].description); //wow, this goes thru and gets description for current time
            weatherDataToday.description = data.list[0].weather[0].description; // sets it to current weatherDataTodayObject
            console.log(weatherDataToday.description);
            weatherDataToday.icon = data.list[0].weather[0].icon;
            weatherDataToday.name = data.city.name;
            console.log(weatherDataToday.name);
            weatherDataToday.date = data.list[0].dt_txt;
            console.log(weatherDataToday.date);
            weatherDataToday.temperature = data.list[0].main.temp;
            console.log(weatherDataToday.temperature);
            weatherDataToday.humidity = data.list[0].main.humidity;
            console.log(weatherDataToday.humidity);
            weatherDataToday.windSpeed = data.list[0].wind.speed;
            console.log(weatherDataToday.windSpeed);

            for(var i = 0 ; i < data.list.length ; i+7){
                weatherDataFiveDay.day[i].description = data.list[i].weather[0].description;
            }
        })
    }

    /*
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
    */


})




