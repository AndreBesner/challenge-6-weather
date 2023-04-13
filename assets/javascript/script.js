$(document).ready(function(){


    // Print the  5 searches as list items
    let previousSearchContainer = $("#previous-search-container");
    function printLastSearches(){
        for(let i = localStorage.length - 1 ; i >= localStorage.length - 6 ; i -- ){
            let key = localStorage.key(i);
            // console.log(localStorage.getItem(key));
            let makeListItem = document.createElement('li');
            makeListItem.innerHTML = localStorage.getItem(key);
            previousSearchContainer.append(makeListItem);
            //make a link

            //on click have it run function like below 
            makeListItem.addEventListener('click', (e)=>{
                e.preventDefault(); // stops page from refreshing
                let city = e.target.innerHTML;
                getLongLat(city);
            })
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
        /*
        This should probably clear any divs displaying the current weather content first
        little heads up for meself for later
        */

        

        let latLongUrl = latLongAPIUrl + data + "&appid=" + apiKey;
        fetch(latLongUrl)
        
        
        .then(function(response){
            if(!response.ok){
                alert("Woops something went wrong!");
            }
            return response.json();
        })
        .catch(function(error){
            console.log(error);
            alert("Something went wrong, please try again later, alligator");
        })
        
        //THIS CHECKS IF THE DATA ENTERED DOESNT WORK
        .then(function (data) {
            if(!data || data.length === 0){
                alert("Sorry, Please enter a valid city name.")
                return;
            }
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
        day : [],
    } ;

    let weatherDay1 = {} ; // gonna go the hard way

    const getWeatherAPIUrl = "http://api.openweathermap.org/data/2.5/forecast?"

    let weatherIconToday = "";

    let openWeatherIconURL = "http://openweathermap.org/img/w/" + weatherIconToday + ".png"

    function getWeather(latitude, longitude){
        let getWeatherUrl = getWeatherAPIUrl + "lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey + "&units=metric";
        console.log(getWeatherUrl);
        fetch(getWeatherUrl)
        .then(function(response){
            if(!response.ok){
                alert("Woops something went wrong!");
            }
            return response.json();
        })
        .then(function (data){

            // This is all the data openweather sends for weather
            console.log(data);

            //here we would set weather data icon

            // weatherDataToday.name = data.city.name;
            // console.log(weatherDataToday.name);
            // $("#city-name").text("Weather for: "+data.city.name);
            $("#city-name-present").text("Weather for: "+data.city.name);
            

            // weatherDataToday.icon = data.list[0].weather[0].icon;
            let iconCode = data.list[0].weather[0].icon;
            let iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
            $("#weather-icon-today").attr('src', iconURL);

            //the missing data is hidden until user gets to point in function where icon is generated so it never looks super ugly only little ugly
            $("#present-day-weather-container").addClass("show");

            // day data
            // weatherDataToday.date = data.list[0].dt_txt;
            // console.log(weatherDataToday.date);
            $("#day-today").text("This is the weather on: " +data.list[0].dt_txt);

            //Current day city name
            // console.log(data.city.name); // wow

            //Current Day Weather Description
            // weatherDataToday.temperature = data.weather[0].description;
            // console.log(data.list[0].weather[0].description); //wow, this goes thru and gets description for current time
            // weatherDataToday.description = data.list[0].weather[0].description; // sets it to current weatherDataTodayObject
            // console.log(weatherDataToday.description);
            $("#description-today").text(data.list[0].weather[0].description);

            // weatherDataToday.temperature = data.list[0].main.temp;
            // console.log(weatherDataToday.temperature);
            $("#temperature-today").text("Temerature: " +data.list[0].main.temp+" Celcius");




            // weatherDataToday.humidity = data.list[0].main.humidity;
            // console.log(weatherDataToday.humidity);
            $("#humidity-today").text(data.list[0].main.humidity +"%");

            // weatherDataToday.windSpeed = data.list[0].wind.speed;
            // console.log(weatherDataToday.windSpeed);
            $("#windspeed-today").text(data.list[0].wind.speed + "km/h");

            console.log('debug time');

            // lets go the hard way 
            weatherDay1.description = data.list[8].weather[0].description;
            weatherDay1.icon = data.list[8].weather[0].icon;
            //here we would set weather data icon



            weatherDay1.name = data.city.name;
            weatherDay1.date = data.list[8].dt_txt;
            weatherDay1.temperature = data.list[8].main.temp;
            weatherDay1.humidity = data.list[8].main.humidity;
            weatherDay1.windSpeed = data.list[8].wind.speed;
            console.log(weatherDay1);



            // displayDayOne(data)  THIS TAKE THE DATA AND PASSES ON
            displayFiveDay(data);




            })
    }

    let fiveDayContainer = $("#five-day-weather-container");
    function displayFiveDay(data){
        for(let i = 7 ; i <= 40 ; i+=7){
            let makeIcon = document.createElement("img");
            let makeDate = document.createElement("div");
            let makeTemp = document.createElement("div");
            let makeHumidity = document.createElement("div");
            let makeWind = document.createElement("div");
            // makeIcon = data.list[i].weather[0].icon;
            let iconCode = data.list[i].weather[0].icon;
            let iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
            makeIcon.setAttribute('src', iconURL);

            makeDate.textContent = data.list[i].dt_txt;
            makeTemp.textContent = data.list[i].main.temp;
            makeHumidity.textContent = data.list[i].main.humidity;
            makeWind.textContent = data.list[i].wind.speed;
            fiveDayContainer.append(makeIcon, makeDate, makeTemp, makeHumidity, makeWind);
        }
    }








    // function displayDayOne(data){
    //     // weatherDataToday.icon = data.list[0].weather[0].icon;
    //     $("#day-one").addClass("show");
    //     let iconCode = data.list[8].weather[0].icon;
    //     let iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
    //     $("#weather-icon-day-one").attr('src', iconURL);
    //     $("#present-day-weather-container").addClass("show");
    //     $("#day-day-one").text("This is the weather on: " +data.list[8].dt_txt);
    //     $("#description-day-one").text(data.list[8].weather[0].description);
    //     $("#temperature-day-one").text("Temerature: " +data.list[8].main.temp+" Celcius");
    //     $("#humidity-day-one").text(data.list[8].main.humidity +"%");
    //     $("#windspeed-day-one").text(data.list[8].wind.speed + "km/h");
    //     console.log('debug time');
        
    // }

    /*
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
    */


})





