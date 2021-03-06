
//variables
//Current forecast variables
var currentHeader = $("#currentHeader")
var currentTemp = $("#temperature")
var currentHumidity = $("#humidity")
var currentWind = $("#wind")
var currentUV = $("#uvIndex")
var currentIcon = $("#currentIcon")

//Five-Day forecast variables
//day one
var d1Date = $("#dayOneDate")
var d1Temp = $("#dayOneTemp")
var d1Humidity = $("#dayOneHumidity")
var d1Icon = $("#dayOneIcon")

//day two
var d2Date = $("#dayTwoDate")
var d2Temp = $("#dayTwoTemp")
var d2Humidity = $("#dayTwoHumidity")
var d2Icon = $("#dayTwoIcon")

//day three
var d3Date = $("#dayThreeDate")
var d3Temp = $("#dayThreeTemp")
var d3Humidity = $("#dayThreeHumidity")
var d3Icon = $("#dayThreeIcon")

//day four
var d4Date = $("#dayFourDate")
var d4Temp = $("#dayFourTemp")
var d4Humidity = $("#dayFourHumidity")
var d4Icon = $("#dayFourIcon")

//day five
var d5Date = $("#dayFiveDate")
var d5Temp = $("#dayFiveTemp")
var d5Humidity = $("#dayFiveHumidity")
var d5Icon = $("#dayFiveIcon")

//retrieves last city searched from local storage
var lastCitySearch = localStorage.getItem("citySearch")

//
//
// if statements and on-click listeners

//makes ajax calls for last city searched
if (lastCitySearch !== null) {
    buildQuery()
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

//
//
//functions
//function for assembling, making and processing ajax calls
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
        currentIcon.attr("src", "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png")
        cityLat = response.coord.lat
        var id = "cityLat"
        var value = cityLat
        localStorage.setItem(id, value);
        cityLon = response.coord.lon
        var id = "cityLon"
        var value = cityLon
        localStorage.setItem(id, value)
    })
    //ajax call for five-day forecast
    var queryURLstart2 = "https://api.openweathermap.org/data/2.5/forecast?";
    var queryParams2 = { "appid": "09bbdc4243d49ba72f9cfcde4484f728" };
    queryParams2.q = localStorage.getItem("citySearch")
    queryURL2 = queryURLstart2 + $.param(queryParams2) + "&units=imperial";
    $.ajax({
        url: queryURL2,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        //shows the five-day forecast boxes in html; list value changes in increments of eight for three hour changes
        $(".days").css("visibility", "visible")
        d1Date.text(moment().add(1, 'days').format("MMM Do"))
        d1Icon.attr("src", "http://openweathermap.org/img/wn/" + response.list[0].weather[0].icon + "@2x.png")
        d1Temp.text("Temp: " + response.list[0].main.temp + "\xB0")
        d1Humidity.text("Humidity: " + response.list[0].main.humidity + "%")
        d2Date.text(moment().add(2, 'days').format("MMM Do"))
        d2Icon.attr("src", "http://openweathermap.org/img/wn/" + response.list[7].weather[0].icon + "@2x.png")
        d2Temp.text("Temp: " + response.list[7].main.temp + "\xB0")
        d2Humidity.text("Humidity: " + response.list[7].main.humidity + "%")
        d3Date.text(moment().add(3, 'days').format("MMM Do"))
        d3Icon.attr("src", "http://openweathermap.org/img/wn/" + response.list[15].weather[0].icon + "@2x.png")
        d3Temp.text("Temp: " + response.list[15].main.temp + "\xB0")
        d3Humidity.text("Humidity: " + response.list[15].main.humidity + "%")
        d4Date.text(moment().add(4, 'days').format("MMM Do"))
        d4Icon.attr("src", "http://openweathermap.org/img/wn/" + response.list[23].weather[0].icon + "@2x.png")
        d4Temp.text("Temp: " + response.list[23].main.temp + "\xB0")
        d4Humidity.text("Humidity: " + response.list[23].main.humidity + "%")
        d5Date.text(moment().add(5, 'days').format("MMM Do"))
        d5Icon.attr("src", "http://openweathermap.org/img/wn/" + response.list[31].weather[0].icon + "@2x.png")
        d5Temp.text("Temp: " + response.list[31].main.temp + "\xB0")
        d5Humidity.text("Humidity: " + response.list[31].main.humidity + "%")
    })
    //ajax call for uv index
    var queryURLstart3 = "https://api.openweathermap.org/data/2.5/uvi?";
    var queryParams3 = { "appid": "09bbdc4243d49ba72f9cfcde4484f728" };
    queryParams3.lat = localStorage.getItem("cityLat")
    queryParams3.lon = localStorage.getItem("cityLon")
    queryURL3 = queryURLstart3 + $.param(queryParams3);
    $.ajax({
        url: queryURL3,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        currentUV.html('UV Index: <b>' + response.value + '</b>')
    })
}

//function for building search term history
function buildHistory() {
    $("#searchHistory").prepend('<input class="button search" type="submit" value=' + citySearch + ' id="' + citySearch + '"><br>')
    $("#" + citySearch).on("click", function () {
        citySearch = this.value
        var id = "citySearch"
        var value = citySearch
        localStorage.setItem(id, value);
        buildQuery()
    }
    )
}


