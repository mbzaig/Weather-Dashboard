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

var queryURL5Day = "http://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid="+APIKey;
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

function displayItems(city, data){
 current(city, data.list[0]);
 forecast(city, data.list);
    
}