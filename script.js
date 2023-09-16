// api key: 99d0a93d93120f2398f6b75b25b153d4
// token: eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OWQwYTkzZDkzMTIwZjIzOThmNmI3NWIyNWIxNTNkNCIsInN1YiI6IjY1MDIxZDAxZmZjOWRlMGVlM2M2OTNmNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hSX4QPoJ3hnfKIInpH_-I3M0XD-mhi7e9zBFCKWI-zg
const config = {
    imgBaseUrl:'https://image.tmdb.org/t/p/',
    backdrop_sizes: [
        "w300",
        "w780",
        "w1280",
        "original"
    ],
    poster_sizes: [
        "w92",
        "w154",
        "w185",
        "w342",
        "w500",
        "w780",
        "original"
    ],
    options:
        {
            headers: {
                Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OWQwYTkzZDkzMTIwZjIzOThmNmI3NWIyNWIxNTNkNCIsInN1YiI6IjY1MDIxZDAxZmZjOWRlMGVlM2M2OTNmNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hSX4QPoJ3hnfKIInpH_-I3M0XD-mhi7e9zBFCKWI-zg",
                accept: "application/json",
            },
        }
}
// requests
const getMovies = () => {
    /*
    *  show the loader
    *  make request to get the top rated movies
    *  once request is successful, hide the loader
    *  create the movie cards with the result of the movies retrieved
    *  then append the movie cards to the movie grid
    *
    * */
    let loader = document.getElementById('loader');
    loader.setAttribute('style',"display:flex");
    fetch("https://api.themoviedb.org/3/movie/top_rated", config.options)
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
            loader.setAttribute('style',"display:none");
            normalizeMovies(response?.results);
        })
        .catch((e) => {
            loader.setAttribute('style',"display:none");
            console.log(e);
        });

}

const getHeader = () => {
    /*
    *  show the loader
    *  make request to get the top rated movies
    *  once request is successful, hide the loader
    *  create the movie cards with the result of the movies retrieved
    *  then append the movie cards to the movie grid
    *
    * */
    const header = document.getElementById("posterHeader");
    const headerTitle = document.getElementById("header-title");
    const headerDesc = document.getElementById("header-description");
    const headerRating = document.getElementById("header-rating");
    const headerPercentage = document.getElementById("header-rating-percentage");
    const headerLink = document.getElementById("header-link");
    // let loader = document.getElementById('loader');
    // loader.setAttribute('style',"display:flex");
    fetch('https://api.themoviedb.org/3/movie/603692?language=en-US', config.options)
        .then((response) => response.json())
        .then((movie) => {
            console.log("header",movie);
            // loader.setAttribute('style',"display:none");
            if (movie){
                console.log('movie',movie)
                headerTitle.textContent = movie.title;
                headerDesc.textContent = movie.overview;
                headerRating.textContent = `${Number(movie.vote_average).toFixed(2)}/10`;
                headerPercentage.textContent= `${Number(movie.vote_average/10) * 100}%`;
                header.setAttribute("style",`background-image:url("${[config.imgBaseUrl,config.backdrop_sizes[3],movie.backdrop_path].join('')}")`)
                headerLink.setAttribute("href",movie.homepage)
            }

        })
        .catch((e) => {
            // loader.setAttribute('style',"display:none");
            console.log(e);
        });

}

const searchMovies = (value) => {
    if(value){
        return getSearchedMovies(value);
    }else {
        return getMovies();
    }
}


const getSearchedMovies = (value)=>{
    const loader = document.createElement('div');
    const roller = document.createElement('div');
    const posterGrid = document.getElementById('movie-poster');
    loader.setAttribute('id','grid-loader');
    roller.setAttribute('class','loader');
    loader.appendChild(roller);
    posterGrid.appendChild(loader)
    loader.setAttribute('style',"display:flex");
    return fetch(`https://api.themoviedb.org/3/search/movie?query=${value}&include_adult=false&language=en-US&page=1`, config.options);
}
// map through the movies and create elements in the movie grid
/*
<div data-testid="movie-card" class="movie-card">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"


                data-testid="movie-poster"
              />
              <p data-testid="movie-title">Stranger Things</p>
              <span data-testid="movie-release-date">USA, 2016 - Current</span>
            </div>
* */


const normalizeMovies = (movies)=>{
    const movieGrid = document.getElementById("movie-poster");
    movieGrid.innerHTML = "";
    if(movies?.length){
        movies.map((m)=>{
            const movieCard = document.createElement('div');
            movieCard.setAttribute('class','movie-card');
            movieCard.setAttribute('data-testid','movie-card');
            const image = document.createElement('img');
            image.setAttribute('src',[config.imgBaseUrl,config.poster_sizes[4],m.poster_path].join(''));
            image.setAttribute('data-testid',"movie-poster");
            const movieTitle = document.createElement('p');
            image.setAttribute('data-testid',"movie-title");
            movieTitle.textContent = m.original_title;
            const movieReleaseDate = document.createElement('span');
            movieReleaseDate.setAttribute('data-testid','movie-release-date');
            const [year,month,day] = m.release_date.split('-');
            movieReleaseDate.textContent = `${Date.UTC(year,month,day)}`;
            movieCard.appendChild(image);
            movieCard.appendChild(movieTitle);
            movieCard.appendChild(movieReleaseDate);
           movieGrid.appendChild(movieCard);
        })
    }else{
        const emptyState = document.createElement('div');
        emptyState.setAttribute('class','empty');
        emptyState.textContent= 'No Movies Available';
        movieGrid.setAttribute("style","grid-template-column:auto");
        movieGrid.appendChild(emptyState)
    }
}



// listen to the search input and make api call to search endpoint when user types
//fetch the search result, loop through the results and populate the grid with movie

document.addEventListener("DOMContentLoaded", function() {

    let searchResponse;
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener("input",(e)=>{
        const value = e.target.value;
        const gridLoader = document.getElementById('grid-loader');
        // gridLoader.setAttribute('style',"display:flex");
        searchMovies(value).then((response) => response.json())
            .then((response) => {
                console.log("search",response);
                gridLoader.setAttribute('style',"display:none");
                normalizeMovies(response?.results);
            })
            .catch((e) => {
                gridLoader.setAttribute('style',"display:none");
                console.log(e);
            });
    })


}, false);




getMovies()
getHeader();
/*
* fetch the now playing results
*  once you get the result
*  pick the first item
*  query the html to get the header using the id
*  const header = document.getElementById('posterHeader");
*  set the background to the url on the backdrop of the first element
*  header.setAttribute("background","url(backdrop_path)");
*
* */
