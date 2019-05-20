$(function () {
    $('.register-button').click(registerUser);

    let username = localStorage.getItem('username');

    if(username){
        $('.username-box').val(username);
    }
});

function registerUser(){
    //Get textbox value
    let username = $('.username-box').val();
    if(username && username.length > 0){
        localStorage.setItem('username', username);
        window.location.href = "index.html";
    }else{
        alert('Invalid name, try again.');
    }
}