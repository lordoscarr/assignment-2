let weatherKey = 'abc78c421fa7510a6486356657bcb876';

$(function () {
    let username = localStorage.getItem('username');

    if (username && username.length > 0) {
        console.log('user exist: ' + username);
    } else {
        console.log('no user');
        window.location.href = "login.html";
    }

    //Get current position
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
});

function showPosition(pos) {
    let url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + pos.coords.latitude + '&lon=' + pos.coords.longitude + '&units=metric' + '&appid=' + weatherKey;

    var xhr = new XMLHttpRequest();

    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            console.log('success!', xhr.response);
            let weather = JSON.parse(xhr.response);
            console.log('weather in ' + weather.name + ' is ' + weather.main.temp);
            $('.city-name').text(weather.name);
            $('.temp-text').html("<i class='owf owf-" + weather.weather[0].id +"'></i> " + Math.round(weather.main.temp) + '°C');
            $('.temp-desc').text(weather.weather[0].description);
        } else {
            $('.temp-desc').text('Fetching weather data failed.');
            console.log('The request failed!');
        }
    };

    xhr.open('GET', url);
    xhr.send();
};