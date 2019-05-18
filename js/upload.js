$(function() {
    
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