document.getElementById('getLocation').addEventListener('click', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        document.getElementById('locationDisplay').innerHTML = "Geolocation is not supported by this browser.";
    }
});

function showPosition(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    document.getElementById('locationDisplay').innerHTML = `Latitude: ${lat}<br>Longitude: ${lon}`;
    fetchWeather(lat, lon);
}

function fetchWeather(lat, lon) {
    const apiKey = 'YOUR_API_KEY_HERE'; // Replace with your actual API key
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            document.getElementById('weatherDisplay').innerHTML = `Current Temperature: ${data.main.temp}°C<br>Weather: ${data.weather[0].description}`;
        })
        .catch(error => {
            document.getElementById('weatherDisplay').innerHTML = 'Failed to retrieve weather information.';
        });
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById('locationDisplay').innerHTML = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById('locationDisplay').innerHTML = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            document.getElementById('locationDisplay').innerHTML = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            document.getElementById('locationDisplay').innerHTML = "An unknown error occurred.";
            break;
    }
}
