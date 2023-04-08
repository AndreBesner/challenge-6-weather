# Challenge 5 Notes

AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly


GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city

##

This one seems like a lot but can be broken down

I need a search bar

Make it w bootstrap and have it to be for city names

When you hit enter or click submit it generates an event

Data from event to be passed onto weather api for city to be turned into coordinates for api call

because i need the long and lat looks like i need to send an api call with the city name to the server

it will then reply with data I can parse for the lat and long to be added to next api call for actual weather

these coordinates are fed into weather api url with our key to get data back in form of JSON

Also, when form is submitted it calls a function to display nicely formatted JSON data to user at right side of page

Weather data printed to page, who cares if it's super pretty. we only need to details listed above

also save the last few searches as buttons phew this is a lot