// make sure the html and css load first
$(document).ready(function () {
    // shows the current date on screen
    var currentDay = moment().format('LLLL');
    $("#currentDay").text(currentDay);


})

var APIKey="16b5177dc1a814042da65ece74800fb0";
var city="London";
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
console.log(queryURL);