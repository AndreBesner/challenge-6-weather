$(document).ready(function(){


    let previousSearches = [] ;

    $("#city-name-input").submit(function(event){
        event.preventDefault();
        let cityName = $("#city-name").val().trim(); // what user entered
        console.log(cityName);
        printName(cityName);
        printData(event);
        previousSearches.push(cityName); // adds user search to array, to be saved to local storage
        console.log(previousSearches);
        localStorage.setItem(city, cityName);
    })

    function printName(name){
        console.log(name);
    }
    
    function printData(data){
        console.log(data);
    }

})