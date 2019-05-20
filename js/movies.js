let movieKey = 'e15565f5';

let username;
$(function () {
    username = localStorage.getItem('username');

    if (username && username.length > 0) {
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
    if (user && user.favorite) {
        $('.favorite-title').text(user.favorite);
    } else {
        $('.favorite-title').text('No favorite movie.')
    }

    $('.watchlist-movies').html('');
    if (user && user.watchlist && user.watchlist.length > 0) {
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
                "<a class='favorite-button' onclick='addFavoriteFromWatchlist(" + index + ")'>set favorite</a>" +
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
    let url = 'https://www.omdbapi.com/?apikey=' + movieKey + '&s=' + searchstring.replace(' ', '+') + '&type=movie';

    $.ajax({
        url: url, // Till adressen "server.php"
        type: 'GET', // Med metoden "post"
        dataType: "JSON", // Hur vi ska tolka den data vi får tillbaka (som JSON)
        cache: false, // Vi tillåter inte att webbläsaren att cacha några resultat
        contentType: false, // Vi vill inte att jQuery ska bestämma hur vårt innehåll ska tolkas
        processData: false // Vi tillåter inte att jQuery att processa vår data (som strängar)
    }).done(function (data) {
        if (data.Error) {
            $('.result-card').html('');
            $('.result-card').append(
                "<div class='error-item'>" +
                "<p class='error-text'>You did an oopsie! No movie could be found.</p>" +
                "</div>"
            );
            console.log('failed.')
        } else {
            movies = data.Search;
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
    }).fail(function (data) {
        // Om vi får ett misslyckat svar
        $('.result-card').html('');
        $('.result-card').append(
            "<div class='error-item'>" +
            "<p class='error-text'>Error! Something's wrong with the internet.</p>" +
            "</div>"
        );
        console.log('failed.');
    });
}

function addFavorite(movieIndex) {
    let movie = movies[movieIndex];
    let user = JSON.parse(localStorage.getItem(username));
    if (!user) {
        user = { watchlist: [], favorite: '' }
    }
    user.favorite = movie.Title;
    localStorage.setItem(username, JSON.stringify(user));
    updateLibraryPage();
    console.log('favorite: ' + JSON.parse(localStorage.getItem(username)).favorite);
}

function addFavoriteFromWatchlist(movieIndex) {
    let user = JSON.parse(localStorage.getItem(username));
    let movie = user.watchlist[movieIndex];
    user.favorite = movie.Title;
    localStorage.setItem(username, JSON.stringify(user));
    updateLibraryPage();
    console.log('favorite: ' + JSON.parse(localStorage.getItem(username)).favorite);
}

function addToWatchlist(movieIndex) {
    let movie = movies[movieIndex];
    let user = JSON.parse(localStorage.getItem(username));
    if (!user) {
        user = { watchlist: [], favorite: '' }
    }
    user.watchlist.push(movie);
    localStorage.setItem(username, JSON.stringify(user));
    updateLibraryPage();
    console.log('watchlist size: ' + user.watchlist.length);
}

function removeFromWatchlist(movieIndex) {
    let user = JSON.parse(localStorage.getItem(username));
    let movie = user.watchlist[movieIndex];
    console.log('removing ' + movie.Title);
    user.watchlist = user.watchlist.filter(item => item !== movie);
    console.log(user.watchlist.length);
    localStorage.setItem(username, JSON.stringify(user));
    updateLibraryPage();
}