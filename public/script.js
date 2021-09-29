const searchElement = document.querySelector('[data-city-search]')
const searchBox = new google.maps.places.SearchBox(searchElement)

searchBox.addListener('places_changed', () => {
    const place = searchBox.getPlaces()[0];
    if (place == null) return;
    const latitude = place.geometry.location.lat();
    const longitude = place.geometry.location.lng();
    console.log(latitude, longitude)
    fetch('/weather', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          latitude: latitude,
          longitude: longitude
        })
    }).then(res => res.json()).then(data => {
          
        console.log(data)
        setWeatherData(data, place.formatted_address)
    })
})
const icon = document.querySelector('[data-weather-icon]');
const locationElement = document.querySelector("[data-location]");
const statusElement = document.querySelector("[data-status]");
const temperatureElement = document.querySelector("[data-temperature]");
const precipitationElement = document.querySelector("[data-precipitation]");
const windElement = document.querySelector("[data-wind]");




function setWeatherData(data, place) {
    locationElement.textContent = place;
    statusElement.textContent = data.weather[0].main;
    temperatureElement.textContent = data.main.temp;
    precipitationElement.textContent = data.weather[0].description;
    windElement.textContent = data.wind.speed;
    const iconId = data.weather[0].icon
    icon.src = `http://openweathermap.org/img/wn/${iconId}@2x.png`
   

}