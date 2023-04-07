$(document).ready(function(){


    let previousSearches = [] ;

    let cityNameInput = $("#city-name-input");
    let cityName = $("#city-name")
    cityNameInput.submit(function(event){
        event.preventDefault();
        cityName = $("#city-name").val().trim(); // what user entered
        // console.log(cityName);
        // printName(cityName);
        // printData(event);
        previousSearches.push(cityName); // adds user search to array, to be saved to local storage
        cityName.textContent = "";
        console.log(previousSearches);
        localStorage.setItem("searchTerm", cityName);
    })


    function printName(name){
        console.log(name);
    }
    
    function printData(data){
        console.log(data);
    }

})