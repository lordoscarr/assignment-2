$(function () {
    $('.register-button').click(registerUser);

    let username = localStorage.getItem('username');

    if(username){
        console.log('user already exist: ' + username);
        $('.username-box').val(username);
    }else{
        console.log('no user');
    }
});

function registerUser(){
    //Get textbox value
    let username = $('.username-box').val();
    if(username && username.length > 0){
        console.log('username: ' + username);
        localStorage.setItem('username', username);
        window.location.href = "index.html";
    }else{
        console.log('invalid input');
        alert('Invalid name, try again.');
    }
}