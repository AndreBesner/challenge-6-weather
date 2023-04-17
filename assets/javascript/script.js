$(document).ready(function(){

    // Function to print the last 5 search items
    let previousSearchContainer = $("#previous-search-container"); //this is where the list for prev searches lives
    function printLastSearches(){
        previousSearchContainer.empty(); // empties previous entries to populate newest
        let cityArray = JSON.parse(localStorage.getItem("cityArray")) || [] ; // look for for existing array of cities searched, if not found creates one
        for(let i = cityArray.length - 1 ; i >= 0 ; i--){
            //This is going to run through and create clickable list items for the last 5 cities searched
            //With more time I would have it check if the city entered is valid or not
            //If not valid I would not save it to local storage but I am running low on time
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
                // after creating the array for local storage we ensure it is only 5 entries long
                if(cityArray.length > 5){
                cityArray.shift();
                }
                localStorage.setItem("cityArray", JSON.stringify(cityArray));
                printLastSearches()
            })
        }

    }
    printLastSearches();

    // This is the function that runs when the user actually hits enter or clicks a previous search
    // List item
    let cityName = $("#city-name");
    $("#city-name-input").submit(function (e) { 
        e.preventDefault(); // stops page from refreshing
        let city = $("#city-name").val().trim(); // saves entered name to variable
        console.log(city)
        let cityArray = JSON.parse(localStorage.getItem("cityArray")) || [] ;
        cityArray.push(city);
        // after creating the array for local storage we ensure it is only 5 entries long
        if(cityArray.length > 5){
            cityArray.shift();
        }
        localStorage.setItem("cityArray", JSON.stringify(cityArray));
        printLastSearches();
        getLongLat(city); // passes city text on to api call, i don't know how, but it works with gibberish sometimes lol
        cityName.val(""); // clears text in box
    });

    // This is the code that takes the human spoken city and converts it
    // to it's latitudinal and longitudinal coordinates to be passed on to next open weather call
    const latLongAPIUrl = "https://api.openweathermap.org/geo/1.0/direct?q="
    const apiKey = "4790ded9cd9c563d5479fc18a7479e30" // i feel like having this here and open in github is bad practice
    function getLongLat(data){
        let latLongUrl = latLongAPIUrl + data + "&appid=" + apiKey;
        fetch(latLongUrl) 
        .then(function(response){
            // Error handling
            if(!response.ok){
                alert("Woops something went wrong!");
            }
            return response.json();
        })
        // Error handling
        .catch(function(error){
            console.log(error);
            alert("Something went wrong, please try again later, alligator");
        })
        // Error handling
        .then(function (data) {
            if(!data || data.length === 0){
                alert("Sorry, Please enter a valid city name.")
                return;
            }
            // Parses returned data for the details we need
           let lat = data[0].lat;
           let lon = data[0].lon;
           $("#state-name-present").text("In the state or province of: " + data[0].state); // This tells user state or province for weather 
           getWeather(lat, lon); // passes on lattitude and longitude to weather api call
        })
    }

    // Weather API call with openweather
    const getWeatherAPIUrl = "https://api.openweathermap.org/data/2.5/forecast?"
    function getWeather(latitude, longitude){
        let getWeatherUrl = getWeatherAPIUrl + "lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey + "&units=metric";
        fetch(getWeatherUrl)
        // Error handling
        .then(function(response){
            if(!response.ok){
                alert("Woops something went wrong!");
            }
            return response.json();
        })
        .then(function (data){
            // The following code prints the relevant weather data returned that was returned by
            // open weather in the form of an object
            // I will not comment each as it speaks for itself
            $("#city-name-present").text("Weather for: "+data.city.name);
            let iconCode = data.list[0].weather[0].icon;
            let iconURL = "https://openweathermap.org/img/w/" + iconCode + ".png"; // this generates the icon image based on code returned then makes link to hosted image file from openweather
            $("#weather-icon-today").attr('src', iconURL);
            $("#present-day-weather-container").addClass("show");
            dayToday = data.list[0].dt_txt
            $("#day-today").text("This is the weather on for right now on: " + dayToday.substring(0, 10)); // this cuts off the ugly time code and leaves only the day
            $("#description-today").text(data.list[0].weather[0].description);
            $("#temperature-today").text("Temerature: " + data.list[0].main.temp+" Celcius");
            $("#humidity-today").text("Humidity at: " + data.list[0].main.humidity +"%");
            $("#windspeed-today").text("Wind speed at: " + data.list[0].wind.speed + "km/h");
            displayFiveDay(data); // passes on data array to function to print the 5 day weather forecast
            })
    }

    // Function to take the weather object and display a 5 day forecast 
    let fiveRizz = $("#five-day"); // I was frustrated making the variable name but I like it now
    function displayFiveDay(data){
        fiveRizz.empty(); // clears previous 5 day data each time this function runs
        // I don't really like how the following code is implemented
        // I wanted each day to have the same "time" but i couldn't figure out the logic
        // After speaking to Adam and Daler they informed me this approach would be fine for scope of project
        // The way it works now is it take the array with 40 elements, we used the first element for present
        // weather conditions, then it loops through remaining 39 evenly and creates a new div for each day
        // with the relevant weather information
        // it took me ages to figure out how to do this and implement bootstrap.
        for(let i = 7 ; i <= 40 ; i+=7){
            let makeDiv = $("<div>").addClass('col bg-primary text-white border');
            let makeList = document.createElement("ul");
            let makeIcon = document.createElement("img");
            let makeDate = document.createElement("li");
            let makeTemp = document.createElement("li");
            let makeHumidity = document.createElement("li");
            let makeWind = document.createElement("li");
            let iconCode = data.list[i].weather[0].icon;
            let iconURL = "https://openweathermap.org/img/w/" + iconCode + ".png";
            makeIcon.setAttribute('src', iconURL);
            makeIcon.setAttribute('alt', 'icon to represent the weather');
            dateText = data.list[i].dt_txt;
            makeDate.textContent = "Weather on: " + dateText.substring(0, 10);
            makeTemp.textContent = "Temp: " + data.list[i].main.temp + " Celcius";
            makeHumidity.textContent = "Humidity: " + data.list[i].main.humidity + "%";
            makeWind.textContent = "Wind Speed: " + data.list[i].wind.speed + "km/h";
            makeList.append(makeDate,makeTemp,makeHumidity,makeWind,makeIcon);
            makeDiv.append(makeList);
            fiveRizz.append(makeDiv);

        }
    }
})





