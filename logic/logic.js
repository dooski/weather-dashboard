console.log("we good")

//Current forecast
var currentTemp = "67"
var currentHumidity = "45%"
var currentWind = "12 mph"
var currentUV = "4.5"

$("#temperature").text("Temperature: " + currentTemp);
$("#humidity").text("Humidity: " + currentHumidity);
$("#wind").text("Wind: " + currentWind);
$("#uvIndex").text("UV Index: " + currentUV);

//Five-Day forecast
var d1Date = "8/26/2020";
var d1Temp = "64";
var d1Humidity = "32%";
$("#dayOneDate").text(d1Date);
$("#dayOneTemp").text("Temp: " + d1Temp);
$("#dayOneHumidity").text("Humidity: " + d1Humidity);

var d2Date = "8/27/2020";
var d2Temp = "52";
var d2Humidity = "30%";
$("#dayTwoDate").text(d2Date);
$("#dayTwoTemp").text("Temp: " + d2Temp);
$("#dayTwoHumidity").text("Humidity: " + d2Humidity);

var d3Date = "8/28/2020";
var d3Temp = "64";
var d3Humidity = "33%";
$("#dayThreeDate").text(d3Date);
$("#dayThreeTemp").text("Temp: " + d3Temp);
$("#dayThreeHumidity").text("Humidity: " + d3Humidity);

var d4Date = "8/29/2020";
var d4Temp = "63";
var d4Humidity = "21%";
$("#dayFourDate").text(d4Date);
$("#dayFourTemp").text("Temp: " + d4Temp);
$("#dayFourHumidity").text("Humidity: " + d4Humidity);

var d5Date = "8/30/2020";
var d5Temp = "69";
var d5Humidity = "30%";
$("#dayFiveDate").text(d5Date);
$("#dayFiveTemp").text("Temp: " + d5Temp);
$("#dayFiveHumidity").text("Humidity: " + d5Humidity);