$(function () {
    document.querySelector('.saved-type-select').addEventListener('change', getMedia);
    document.querySelector('.type-select').addEventListener('change', updateButton);

    username = localStorage.getItem('username');

    if (username && username.length > 0) {
        console.log('user exist: ' + username);
    } else {
        window.location.href = "login.html";
    }

    getMedia();
});

function showUpload() {
    $('.upload-page').removeClass('invisible');
    $('.mediaplayer-page').addClass('invisible');
    $('.menu-upload').addClass('navbar-active');
    $('.menu-mediaplayer').removeClass('navbar-active');
}

function showMediaPlayer() {
    $('.mediaplayer-page').removeClass('invisible');
    $('.upload-page').addClass('invisible');
    $('.menu-upload').removeClass('navbar-active');
    $('.menu-mediaplayer').addClass('navbar-active');
}

// När man skickar iväg formuläret (klickat på knappen "Spara media")
$(".upload-form").submit(function (e) {
    // Förhindrar att vi skickas iväg till en ny sida (standardhändelsen)
    e.preventDefault();
    // Hämtar formulärsdata (värde från drop-down menyn, samt filen)
    var formData = new FormData(this);

    if ($('.file-input').val() != '' && $('.title-box').val().length > 0 && $('.type-select').val() != 'none') {
        // Gör ett ajax-anrop
        $.ajax({
            url: $(this).attr("action"), // Till adressen "server.php"
            type: $(this).attr("method"), // Med metoden "post"
            data: formData, // Vår data vi skickar med
            dataType: "JSON", // Hur vi ska tolka den data vi får tillbaka (som JSON)
            cache: false, // Vi tillåter inte att webbläsaren att cacha några resultat
            contentType: false, // Vi vill inte att jQuery ska bestämma hur vårt innehåll ska tolkas
            processData: false // Vi tillåter inte att jQuery att processa vår data (som strängar)
        }).done(function (data) {
            // Om vi får ett lyckat svar
            alert('Nice! Your file has been uploaded!');
            window.location.href = 'upload.html';
        }).fail(function (data) {
            // Om vi får ett misslyckat svar
            alert('Oh no! Looks like the upload failed!')
        });
    } else {
        alert("Whoops! Looks like you didn't fill out the form properly. Try again!");
    }
});

function updateButton() {
    let type = $('.type-select').val();
    $('.file-input').attr("accept", type + "/*");
    console.log('updated accept attribute to ' + type);
}

function getMedia() {
    $('.media-list').html('');
    let type = $('.saved-type-select').val();
    if (type == 'all') {
        //download all
        $.ajax({
            url: 'https://ddwap.mah.se/ah7379/server.php?action=getMedia', // Till adressen "server.php"
            type: 'GET', // Med metoden "post"
            dataType: "JSON", // Hur vi ska tolka den data vi får tillbaka (som JSON)
            cache: false, // Vi tillåter inte att webbläsaren att cacha några resultat
            contentType: false, // Vi vill inte att jQuery ska bestämma hur vårt innehåll ska tolkas
            processData: false // Vi tillåter inte att jQuery att processa vår data (som strängar)
        }).done(function (data) {
            // Om vi får ett lyckat svar
            if (data.files && data.files.length > 0) {
                data.files.forEach(file => {
                    let mediaHtml;
                    let fileExtension = file.path.split('.').pop();
                    if (file.type == 'photo') {
                        mediaHtml = "<img class='media-img' src='http://ddwap.mah.se/ah7379/" + file.path + "' />"
                    } else if (file.type == 'video') {
                        mediaHtml = "<video controls>" +
                            "<source src='http://ddwap.mah.se/ah7379/" + file.path + "' type='video/" + fileExtension + "'>" +
                            "Your browser does not support the video tag." +
                            "</video>"
                    } else if (file.type == 'audio') {
                        mediaHtml = "<audio controls>" +
                            "<source src='http://ddwap.mah.se/ah7379/" + file.path + "' type='audio/" + fileExtension + "'>" +
                            "Your browser does not support the audio element." +
                            "</audio>"
                    }

                    $('.media-list').append(
                        "<a href='http://ddwap.mah.se/ah7379/" + file.path + "'>" +
                        "<div class='file-item' >" +
                        "<p class='file-title-text'>" + file.title + "</p>" +
                        "<p class='type-text'>" + file.type + " <span class='time-text'> " + file.timestamp + "</span></p>" +
                        mediaHtml + 
                        "</div>" +
                        "</a>"
                    );
                });
            }
        }).fail(function (data) {
            // Om vi får ett misslyckat svar
            console.log(data);
        });
    } else {
        $.ajax({
            url: 'https://ddwap.mah.se/ah7379/server.php?action=getMedia&type=' + type, // Till adressen "server.php"
            type: 'GET', // Med metoden "post"
            dataType: "JSON", // Hur vi ska tolka den data vi får tillbaka (som JSON)
            cache: false, // Vi tillåter inte att webbläsaren att cacha några resultat
            contentType: false, // Vi vill inte att jQuery ska bestämma hur vårt innehåll ska tolkas
            processData: false // Vi tillåter inte att jQuery att processa vår data (som strängar)
        }).done(function (data) {
            // Om vi får ett lyckat svar
            if (data.files && data.files.length > 0) {
                data.files.forEach(file => {
                    $('.media-list').append(
                        "<div class='file-item' >" +
                        "<p class='file-title-text'>" + file.title + "</p>" +
                        "<p class='type-text'>" + file.type + " <span class='time-text'> " + file.timestamp + "</span></p>" +
                        "</div>"
                    );
                });
            }
        }).fail(function (data) {
            // Om vi får ett misslyckat svar
            console.log(data);
        });
    }
}