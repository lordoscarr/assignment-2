let weatherKey = 'abc78c421fa7510a6486356657bcb876';

$(function () {
    let username = localStorage.getItem('username');

    if (username && username.length > 0) {
        console.log('user exist: ' + username);
    } else {
        window.location.href = "login.html";
    }

    //Get current position
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert('Geolocation is not supported by your browser.');
    }
});

function showPosition(pos) {
    let url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + pos.coords.latitude + '&lon=' + pos.coords.longitude + '&units=metric' + '&appid=' + weatherKey;

    $.ajax({
        url: url, // Till adressen "server.php"
        type: 'GET', // Med metoden "post"
        dataType: "JSON", // Hur vi ska tolka den data vi får tillbaka (som JSON)
        cache: false, // Vi tillåter inte att webbläsaren att cacha några resultat
        contentType: false, // Vi vill inte att jQuery ska bestämma hur vårt innehåll ska tolkas
        processData: false // Vi tillåter inte att jQuery att processa vår data (som strängar)
    }).done(function (data) {
        $('.city-name').text(data.name);
        $('.temp-text').html("<i class='owf owf-" + data.weather[0].id + "'></i> " + Math.round(data.main.temp) + '°C');
        $('.temp-desc').text(data.weather[0].description);
    }).fail(function (data) {
        // Om vi får ett misslyckat svar
        $('.temp-desc').text('Fetching weather data failed.');
    });
};