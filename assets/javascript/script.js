$(document).ready(function(){

    let cityName = $("#city-name");
    
    $("#city-name-input").submit(function (e) { 
        e.preventDefault(); // stops page from refreshing

        let city = $("#city-name").val().trim(); // saves entered name to variable
        console.log(city)

        let storageKey = "userText" + Date.now(); // sets a key for individual local storage
        localStorage.setItem(storageKey, city); // sets each search term to local storage

        cityName.val("");

    });


})




