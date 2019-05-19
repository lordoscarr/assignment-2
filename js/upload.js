$(function () {
    document.querySelector('.saved-type-select').addEventListener('change', getMedia);
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

    if ($('.file-input').val() != '' && $('.title-box').length > 0 && $('.type-select').val() != 'none') {
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
            alert('Nice! Your file has been uploaded!')
            console.log('success.')
            console.log(data);
        }).fail(function (data) {
            // Om vi får ett misslyckat svar
            alert('Oh no! Looks like the upload failed!')
            console.log('failed.')
            console.log(data.responseText);
        });
    } else {
        alert("Whoops! Looks like you didn't fill out the form properly. Try again!");
    }
});

function getMedia() {
    $('.media-list').html('');
    let type = $('.saved-type-select').val();
    if (type == 'all') {
        //download all
        console.log('showing all media types');
        $.ajax({
            url: 'https://ddwap.mah.se/ah7379/server.php?action=getMedia', // Till adressen "server.php"
            type: 'GET', // Med metoden "post"
            dataType: "JSON", // Hur vi ska tolka den data vi får tillbaka (som JSON)
            cache: false, // Vi tillåter inte att webbläsaren att cacha några resultat
            contentType: false, // Vi vill inte att jQuery ska bestämma hur vårt innehåll ska tolkas
            processData: false // Vi tillåter inte att jQuery att processa vår data (som strängar)
        }).done(function (data) {
            // Om vi får ett lyckat svar
            console.log('success.');
            if (data.files && data.files.length > 0) {
                data.files.forEach(file => {
                    $('.media-list').append(
                        "<a href='http://ddwap.mah.se/ah7379/" + file.path + "'>" +
                        "<div class='file-item' >" +
                        "<p class='file-title-text'>" + file.title + "</p>" +
                        "<p class='type-text'>" + file.type + " <span class='time-text'> " + file.timestamp + "</span></p>" +
                        "</div>" +
                        "</a>"
                    );
                });
            }
            console.log(data);
        }).fail(function (data) {
            // Om vi får ett misslyckat svar
            console.log('failed.')
            console.log(data.responseText);
        });
    } else {
        console.log('showing media type: ' + type);
        $.ajax({
            url: 'https://ddwap.mah.se/ah7379/server.php?action=getMedia&type=' + type, // Till adressen "server.php"
            type: 'GET', // Med metoden "post"
            dataType: "JSON", // Hur vi ska tolka den data vi får tillbaka (som JSON)
            cache: false, // Vi tillåter inte att webbläsaren att cacha några resultat
            contentType: false, // Vi vill inte att jQuery ska bestämma hur vårt innehåll ska tolkas
            processData: false // Vi tillåter inte att jQuery att processa vår data (som strängar)
        }).done(function (data) {
            // Om vi får ett lyckat svar
            console.log('success.');
            if (data.files && data.files.length > 0) {
                data.files.forEach(file => {
                    $('.media-list').append(
                        "<a href='https://ddwap.mah.se/ah7379/" + file.path + "'>" +
                        "<div class='file-item' >" +
                        "<p class='file-title-text'>" + file.title + "</p>" +
                        "<p class='type-text'>" + file.type + " <span class='time-text'> " + file.timestamp + "</span></p>" +
                        "</div>" +
                        "</a>"
                    );
                });
            }
            console.log(data);
        }).fail(function (data) {
            // Om vi får ett misslyckat svar
            console.log('failed.')
            console.log(data.responseText);
        });
    }
}