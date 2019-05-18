let movieKey = 'e15565f5';

let username;
$(function () {
    username = localStorage.getItem('username');

    if (username) {
        console.log('user exist: ' + username);
    } else {
        console.log('no user');
        window.location.href = "login.html";
    }

    let params = new URLSearchParams(window.location.search);
    if (params.has('s')) {
        searchMovies(params.get('s'));
    }

    updateLibraryPage();
});

function showSearch() {
    $('.search-page').removeClass('invisible');
    $('.library-page').addClass('invisible');
    $('.menu-search').addClass('navbar-active');
    $('.menu-library').removeClass('navbar-active');
}

function showLibrary() {
    $('.library-page').removeClass('invisible');
    $('.search-page').addClass('invisible');
    $('.menu-search').removeClass('navbar-active');
    $('.menu-library').addClass('navbar-active');
}

function updateLibraryPage() {
    let user = JSON.parse(localStorage.getItem(username));
    if (user.favorite) {
        $('.favorite-title').text(user.favorite);
    } else {
        $('.favorite-title').text('No favorite movie.')
    }

    $('.watchlist-movies').html('');
    if (user.watchlist && user.watchlist.length > 0) {
        let index = 0;
        user.watchlist.forEach(movie => {
            $('.watchlist-movies').append(
                "<div class='watchlist-item'>" +
                "<a href='https://www.imdb.com/title/" + movie.imdbID + "'>" +
                "<div class='movie-item no-background' >" +
                "<img class='movie-img' src='" + movie.Poster + "' >" +
                "<div class='movie-info'>" +
                "<p class='movie-title'>" + movie.Title + "</p>" +
                "<p class='movie-year'>" + movie.Year + "</p>" +
                "</div>" +
                "</div>" +
                "</a>" +
                "<div class='movie-buttons'>" +
                "<a class='favorite-button' onclick='addFavorite(" + index + ")'>set favorite</a>" +
                "<a class='watchlist-button' onclick='removeFromWatchlist(" + index + ")'>remove from watchlist</a>" +
                "</div>" + 
                "</div>"
            );
            index++;
        });
    } else {
        $('.watchlist-movies').html(
            "<div class='empty-item'>" +
            "<p class='empty-text'>No movies on your watchlist.</p>" +
            "</div>");
    }
}

let movies = [];
function searchMovies(searchstring) {
    let url = 'http://www.omdbapi.com/?apikey=' + movieKey + '&s=' + searchstring.replace(' ', '+') + '&type=movie';

    var xhr = new XMLHttpRequest();

    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            console.log('success!', xhr.response);
            let response = JSON.parse(xhr.response);
            if (response.Error) {
                //Error, no movie found probably
                console.log(response.Error)
                $('.result-card').html('');
                $('.result-card').append(
                    "<div class='error-item'>" +
                    "<p class='error-text'>Error! No movie could be found.</p>" +
                    "</div>"
                );
            } else {
                movies = response.Search;
                $('.result-card').html('');
                let index = 0;
                movies.forEach(movie => {
                    if (movie.Poster == 'N/A') {
                        movie.Poster = 'img/placeholder.jpg';
                    }
                    $('.result-card').append(
                        "<div class='movie-item' >" +
                        "<img class='movie-img' src='" + movie.Poster + "' >" +
                        "<div class='movie-info'>" +
                        "<p class='movie-title'>" + movie.Title + "</p>" +
                        "<p class='movie-year'>" + movie.Year + "</p>" +
                        "</div>" +
                        "</div>" +
                        "<div class='movie-buttons'>" +
                        "<a class='favorite-button' onclick='addFavorite(" + index + ")'>set favorite</a>" +
                        "<a class='watchlist-button' onclick='addToWatchlist(" + index + ")'>add to watchlist</a>" +
                        "</div>"
                    );
                    index++;
                });
            }
            console.log(response);
        } else {
            console.log('failed');

        }
    };

    xhr.open('GET', url);
    xhr.send();
}

function addFavorite(movieIndex){
    let movie = movies[movieIndex];
    let user = JSON.parse(localStorage.getItem(username));
    if(!user){
        user = {watchlist: [], favorite: ''}
    }
    user.favorite = movie.Title;
    localStorage.setItem(username, JSON.stringify(user));
    updateLibraryPage();
    console.log('favorite: ' + JSON.parse(localStorage.getItem(username)).favorite);
}

function addToWatchlist(movieIndex){
    let movie = movies[movieIndex];
    let user = JSON.parse(localStorage.getItem(username));
    if(!user){
        user = {watchlist: [], favorite: ''}
    }
    user.watchlist.push(movie);
    localStorage.setItem(username, JSON.stringify(user));
    updateLibraryPage();
    console.log('watchlist size: ' + user.watchlist.length);
}

function removeFromWatchlist(movieIndex){
    let user = JSON.parse(localStorage.getItem(username));
    let movie = user.watchlist[movieIndex];
    console.log('removing ' + movie.Title);
    user.watchlist = user.watchlist.filter(item => item !== movie);
    console.log(user.watchlist.length);
    localStorage.setItem(username, JSON.stringify(user));
    updateLibraryPage();
}