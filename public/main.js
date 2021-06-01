// Foursquare API Info, use the "explore venue" API
const clientId = "YH42A4XOPQOB1VFHVTHLJGDAOMTTPYXJXX4HYGPL0CCLTATP";
const clientSecret = "VYCVRAAME2XBWVUM4BF4I4HP5MKTI0BTQGHMG4HCJNKB5QNY";
const url = "https://api.foursquare.com/v2/venues/explore?near=";

// OpenWeather Info
const openWeatherKey = "9ecb08d726e565bf09f2edf41e5bb7d3";
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather";

// Page Elements
const $input = $("#city");
const $submit = $("#button");
const $destination = $("#destination");
const $container = $(".container");
const $venueDivs = [
  $("#venue1"),
  $("#venue2"),
  $("#venue3"),
  $("#venue4"),
  $("#venue5"),
  $("#venue6"),
  $("#venue7"),
  $("#venue8"),
];
const $weatherDiv = $("#weather1");
const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// Add AJAX functions
// Get an array of 20 venues from Foursquare
const getVenues = async () => {
  const city = $input.val();
  const urlToFetch =
    url +
    city +
    "&limit=20&client_id=" +
    clientId +
    "&client_secret=" +
    clientSecret +
    "&v=20210429";
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      const venues = jsonResponse.response.groups[0].items.map(
        (item) => item.venue
      );
      return venues.sort((venue1, venue2) => 0.5 - Math.random());
    }
  } catch (error) {
    console.log(error);
  }
};

// Get an object of weather info from OpenWeather
const getForecast = async () => {
  const urlToFetch =
    weatherUrl + "?&q=" + $input.val() + "&APPID=" + openWeatherKey;
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse;
    }
  } catch (error) {
    console.log(error);
  }
};

// Render functions
const renderVenues = (venues) => {
  $venueDivs.forEach(($venue, index) => {
    const venue = venues[index];
    const venueIcon = venue.categories[0].icon;
    const venueImgSrc = venueIcon.prefix + "bg_64" + venueIcon.suffix;
    let venueContent = createVenueHTML(venue.name, venue.location, venueImgSrc);
    $venue.append(venueContent);
  });
  $destination.append(`<h2>${venues[0].location.city}</h2>`);
};

const renderForecast = (day) => {
  let weatherContent = createWeatherHTML(day);
  $weatherDiv.append(weatherContent);
};

const executeSearch = () => {
  $venueDivs.forEach((venue) => venue.empty());
  $weatherDiv.empty();
  $destination.empty();
  $container.css("visibility", "visible");
  getVenues().then((venues) => renderVenues(venues));
  getForecast().then((forecast) => renderForecast(forecast));
  return false;
};

$submit.click(executeSearch);
