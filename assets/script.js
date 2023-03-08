// make sure the html and css load first
$(document).ready(function () {
    // shows the current date on screen
    var currentDay = moment().format('LLLL');
    $("#currentDay").text(currentDay);


})

var APIKey = weatherApi;
// var city="Manchester";

// console.log("Queries 5 Day data" + queryURL5Day);

var searchBtn = document.getElementById("search-button");
var searchCity = document.getElementById("search-input");


function citySearch(search) {

    var queryURLCity = "http://api.openweathermap.org/geo/1.0/direct?q=" + search + "&limit=5&appid=" + APIKey;
    console.log("Queries the City " + queryURLCity);


    fetch(queryURLCity)
        .then((response) => response.json())
        .then((data) => {
            console.log(data[0]);
            weatherSearch(data[0]);
        });

}



function weatherSearch(location) {
    var { lat, lon } = location;
    var city = location.name;

    var queryURL5Day = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&units=metric";
    fetch(queryURL5Day)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            displayItems(city, data);
        });

}

searchBtn.addEventListener("click", validCity);
function validCity(e) {
    if (!searchCity.value) {
        return;
    }
    e.preventDefault();
    var search = searchCity.value.trim();
    citySearch(search);
}

function displayItems(city, data) {

    current(city, data.list[0]);

    forecast(city, data.list);

}

function current(place, info) {
    // Extract the relevant data from the API response
    var city = place;
    console.log("This City " + city);
    
    var date = moment.unix(info.dt).format("dddd, MMMM Do");
    var icon = $("<img>").attr(
        "src",
        "https://openweathermap.org/img/w/" + info.weather[0].icon + ".png"
    );
    var temp = $("<p>").text("Temperature: " + info.main.temp + " °C");
    var humidity = $("<p>").text("Humidity: " + info.main.humidity + "%");
    var windSpeed = $("<p>").text("Wind Speed: " + info.wind.speed + " m/s");

    // Clear the current weather div and add the new content
    $("#current-weather").empty();
    $("#current-weather")
        .append($("<h3>").text(city + " (" + date + ")"))
        .append(icon)
        .append(temp)
        .append(humidity)
        .append(windSpeed);
}


function forecast(place, info) {
    // Clear the forecast div and add a heading
    $("#forecast").empty().append($("<h2>").text("5-Day Forecast:"));
    var city=place;
    // Loop through the forecast data and display each day's weather
    for (var i = 0; i < info.length; i++) {
        // Only display the weather for 12:00 PM each day
        if (info[i].dt_txt.indexOf("12:00:00") !== -1) {
            // Extract the relevant data from the API response
            var date = moment.unix(info[i].dt).format("ddd, MMMM Do");
            var icon = $("<img>").attr(
                "src",
                "https://openweathermap.org/img/w/" +
                info[i].weather[0].icon +
                ".png" 
            );
            var temp = $("<p>").text("Temp: " + info[i].main.temp + " °C");
            var humidity = $("<p>").text(
                "Humidity: " + info[i].main.humidity + "%"
            );
            $("#city-forecast")
            .append($("<h2>").text(city ))
            // Create a div for each day's weather and append it to the forecast div
            var card = $("<div>").addClass("card bg-primary text-white");
            var cardBody = $("<div>").addClass("card-body p-2");
            cardBody.append($("<h5>").text(city), date, icon, temp, humidity); // append card body to the card
            card.append(cardBody); // append card body to the card
            $("#forecast").append(card);
        }
    }
}