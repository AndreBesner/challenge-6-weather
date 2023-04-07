$(document).ready(function(){
    $("#city-name-input").submit(function(event){
        event.preventDefault();
        let cityName = $("#city-name").val();
        console.log(cityName);
    })
})
