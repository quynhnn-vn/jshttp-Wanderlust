// Create the HTML string to display the venue information
const createVenueHTML = (name, location, iconSource) => {
  return `<h2>${name}</h2>
  <img class="venueimage" src="${iconSource}"/>
  <h3>Address:</h3>
  <p>${location.address}</p>
  <p>${location.city}</p>
  <p>${location.country}</p>`;
};
 
// Create the HTML string to display the weather information
const createWeatherHTML = (currentDay) => {
  return `<h2>${weekDays[new Date().getDay()]}</h2>
		<h2>Temperature: ${kelvinToCelsius(currentDay.main.temp)}&deg;C</h2>
		<h2>Condition: ${currentDay.weather[0].description}</h2>
    <h2>Local sunrise time: ${utcTimeStampToLocalTime(
      currentDay.sys.sunrise,
      currentDay.timezone
    )}</h2>
    <h2>Local sunset time: ${utcTimeStampToLocalTime(
      currentDay.sys.sunset,
      currentDay.timezone
    )}</h2>
  	<img src="https://openweathermap.org/img/wn/${
      currentDay.weather[0].icon
    }@2x.png">`;
};

// Convert degrees Kelvin to Celsius
const kelvinToCelsius = (k) => (k - 273.15).toFixed(0);

// Convert timestamp with timezone offset to human-readable time
const utcTimeStampToLocalTime = (sec, timezone) => {
  const date = new Date(sec * 1000);
  let hours = date.getUTCHours() + timezone / 3600;
  if (hours >= 24) hours -= 24;
  const minutes = "0" + date.getUTCMinutes();
  const seconds = "0" + date.getUTCSeconds();
  const formattedTime =
    hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
  return formattedTime;
};
