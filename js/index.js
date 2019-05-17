let weatherKey = 'abc78c421fa7510a6486356657bcb876';

$(function () {
    let username = localStorage.getItem('username');

    if (username) {
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
    let url = 'api.openweathermap.org/data/2.5/weather?lat=' + pos.coords.latitude + '&lon=' + pos.coords.longitude;

    var xhr = new XMLHttpRequest();

    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            console.log('success!', xhr);
        } else {
            console.log('The request failed!');
        }
    };

    xhr.open('GET', url);
    xhr.send();
};