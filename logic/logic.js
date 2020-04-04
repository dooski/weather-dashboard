console.log("we good")

//Current forecast variables
var currentHeader = $("#currentHeader")
var currentTemp = $("#temperature")
var currentHumidity = $("#humidity")
var currentWind = $("#wind")
var currentUV = $("#uvIndex")

//Five-Day forecast variables
//day one
var d1Date = $("#dayOneDate")
var d1Temp = $("#dayOneTemp")
var d1Humidity = $("#dayOneHumidity")

//day two
var d2Date = $("#dayTwoDate")
var d2Temp = $("#dayTwoTemp")
var d2Humidity = $("#dayTwoHumidity")

//day three
var d3Date = $("#dayThreeDate")
var d3Temp = $("#dayThreeTemp")
var d3Humidity = $("#dayThreeHumidity")

//day four
var d4Date = $("#dayFourDate")
var d4Temp = $("#dayFourTemp")
var d4Humidity = $("#dayFourHumidity")


//day five
var d5Date = $("#dayFiveDate")
var d5Temp = $("#dayFiveTemp")
var d5Humidity = $("#dayFiveHumidity")

//saves last city searched to local storage
var lastCitySearch = localStorage.getItem("citySearch")
//pulls up last city searched from local storage upon page load
if (lastCitySearch !== null) {
    buildQuery()
}

//sends out query for today's weather and updates HTML elements
// function queryWeather() {
//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     }).then(function (response) {
//         console.log(response)
//         var todaysDate = moment().format("MMM Do YY");
//         var currentCity = response.name;
//         currentHeader.text(currentCity + " (" + todaysDate + ")")
//         currentTemp.text("Today's Temperature: " + response.main.temp + "\xB0")
//         currentHumidity.text("Today's Humidity: " + response.main.humidity + "%")
//         currentWind.text("Today's Wind Speed: " + response.wind.speed + " mph")
//     })
// }
//assembles queryURL for AJAX calls
function buildQuery() {
    var queryURLstart = "https://api.openweathermap.org/data/2.5/weather?";
    var queryParams = { "appid": "09bbdc4243d49ba72f9cfcde4484f728" };
    // takes city search name from local storage
    queryParams.q = localStorage.getItem("citySearch")
    queryURL = queryURLstart + $.param(queryParams) + "&units=imperial";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        var todaysDate = moment().format("MMM Do YY");
        var currentCity = response.name;
        currentHeader.text(currentCity + " (" + todaysDate + ")")
        currentTemp.text("Today's Temperature: " + response.main.temp + "\xB0")
        currentHumidity.text("Today's Humidity: " + response.main.humidity + "%")
        currentWind.text("Today's Wind Speed: " + response.wind.speed + " mph")
    })
}

//function for building search term history
function buildHistory() {
    $("#searchHistory").prepend('<input class="button search" type="submit" value=' + citySearch + ' id="' + citySearch + '">')
    $("#" + citySearch).on("click", function () {
        citySearch = this.value
        var id = "citySearch"
        var value = citySearch
        localStorage.setItem(id, value);
        buildQuery()
    }
    )
}


//button click for new city searches
$("#citySearchButton").on("click", function () {
    //puts new search in local storage
    citySearch = $("#citySearchTerm").val()
    var id = "citySearch"
    var value = citySearch
    localStorage.setItem(id, value);
    buildQuery();
    buildHistory();
})
