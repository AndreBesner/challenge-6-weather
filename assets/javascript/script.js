$(document).ready(function(){

    // Print the  5 searches as list items
    let previousSearchContainer = $("#previous-search-container");
    function printLastSearches(){
        previousSearchContainer.empty();
        let cityArray = JSON.parse(localStorage.getItem("cityArray")) || [] ;
        for(let i = cityArray.length - 1 ; i >= 0 ; i--){
            let makeListItem = document.createElement('li');
            makeListItem.innerHTML = cityArray[i];
            previousSearchContainer.append(makeListItem);
            //on click have it run function like below 
            makeListItem.addEventListener('click', (e)=>{
                e.preventDefault(); // stops page from refreshing
                let city = e.target.innerHTML;
                getLongLat(city);
                let cityArray = JSON.parse(localStorage.getItem("cityArray")) || [] ;
                cityArray.push(city);
                if(cityArray.length > 5){
                cityArray.shift();
                }
                localStorage.setItem("cityArray", JSON.stringify(cityArray));
                printLastSearches()
            })
        }

    }

    printLastSearches()
    let cityName = $("#city-name");
    $("#city-name-input").submit(function (e) { 
        e.preventDefault(); // stops page from refreshing
        let city = $("#city-name").val().trim(); // saves entered name to variable
        console.log(city)
        let cityArray = JSON.parse(localStorage.getItem("cityArray")) || [] ;
        cityArray.push(city);
        if(cityArray.length > 5){
            cityArray.shift();
        }
        localStorage.setItem("cityArray", JSON.stringify(cityArray));
        printLastSearches();
        getLongLat(city); // passes city text on to api call idek how but it works with gibberish
        cityName.val(""); // clears text in box
    });

    const latLongAPIUrl = "http://api.openweathermap.org/geo/1.0/direct?q="
    const apiKey = "4790ded9cd9c563d5479fc18a7479e30"
    function getLongLat(data){
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
           let lat = data[0].lat;
           let lon = data[0].lon;
           getWeather(lat, lon);
        })
    }

    const getWeatherAPIUrl = "http://api.openweathermap.org/data/2.5/forecast?"
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

            console.log(data);
            $("#city-name-present").text("Weather for: "+data.city.name);
            let iconCode = data.list[0].weather[0].icon;
            let iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
            $("#weather-icon-today").attr('src', iconURL);
            $("#present-day-weather-container").addClass("show");
            dayToday = data.list[0].dt_txt
            $("#day-today").text("This is the weather on for right now on: " + dayToday.substring(0, 10));
            $("#description-today").text(data.list[0].weather[0].description);
            $("#temperature-today").text("Temerature: " + data.list[0].main.temp+" Celcius");
            $("#humidity-today").text("Humidity at: " + data.list[0].main.humidity +"%");
            $("#windspeed-today").text("Wind speed at: " + data.list[0].wind.speed + "km/h");
            displayFiveDay(data);
            })
    }

    let fiveDayContainer = $("#five-day-weather-container");
    let fiveRizz = $("#five-day");
    function displayFiveDay(data){
        fiveRizz.empty();
        fiveDayContainer.empty();
        for(let i = 7 ; i <= 40 ; i+=7){
            let makeDiv = $("<div>").addClass('col');
            let makeList = document.createElement("ul");
            let makeIcon = document.createElement("img");
            let makeDate = document.createElement("li");
            let makeTemp = document.createElement("li");
            let makeHumidity = document.createElement("li");
            let makeWind = document.createElement("li");
            let iconCode = data.list[i].weather[0].icon;
            let iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
            makeIcon.setAttribute('src', iconURL);
            dateText = data.list[i].dt_txt
            
            makeDate.textContent = "Weather on: " + dateText.substring(0, 10);
            makeTemp.textContent = "Temp: " + data.list[i].main.temp + " Celcius";
            makeHumidity.textContent = "Humidity: " + data.list[i].main.humidity + "%";
            makeWind.textContent = "Wind Speed: " + data.list[i].wind.speed + "%";

            makeList.append(makeDate,makeTemp,makeHumidity,makeWind,makeIcon);
            makeDiv.append(makeList);
            fiveRizz.append(makeDiv);
            

            // makeList.append(makeDate, makeTemp, makeHumidity, makeWind)
            // $(makeList).addClass('col');
            // makeDiv.append(makeList);
            // fiveDayContainer.append(makeIcon, makeDiv);
        }
    }
})





