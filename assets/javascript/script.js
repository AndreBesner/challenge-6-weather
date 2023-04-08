$(document).ready(function(){

    let cityName = $("#city-name");
    
    $("#city-name-input").submit(function (e) { 
        e.preventDefault(); // stops page from refreshing

        let city = $("#city-name").val().trim(); // saves entered name to variable
        console.log(city)

        let storageKey = "userText" + Date.now(); // sets a key for individual local storage
        localStorage.setItem(storageKey, city); // sets each search term to local storage

        getLongLat(city);

        cityName.val("");

    });



    const latLongAPIUrl = "http://api.openweathermap.org/geo/1.0/direct?q="
    const apiKey = "4790ded9cd9c563d5479fc18a7479e30"
    function getLongLat(data){
        console.log(data);
        let latLongUrl = latLongAPIUrl + data + "&appid=" + apiKey;
        fetch(latLongUrl)
        .then(function(response){
            return response.json();
        })
        .then(function (data) {
        //    console.log(data);
        //    console.log(data[0].lat);
           let lat = data[0].lat;
           console.log(lat);
        //    console.log(data[0].lon);
           let lon = data[0].lon;
           console.log(lon);
           getWeather(lat, lon);
        })
    }

    const getWeatherAPIUrl = "http://api.openweathermap.org/data/2.5/forecast?"
    function getWeather(latitude, longitude){
        let getWeatherUrl = getWeatherAPIUrl + "lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey;
        console.log(getWeatherUrl);
        fetch(getWeatherUrl)
        .then(function(response){
            return response.json();
        })
        .then(function (data){
            console.log(data);
        })
    }



})




