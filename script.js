// api key: 99d0a93d93120f2398f6b75b25b153d4
// token: eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OWQwYTkzZDkzMTIwZjIzOThmNmI3NWIyNWIxNTNkNCIsInN1YiI6IjY1MDIxZDAxZmZjOWRlMGVlM2M2OTNmNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hSX4QPoJ3hnfKIInpH_-I3M0XD-mhi7e9zBFCKWI-zg
const option = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OWQwYTkzZDkzMTIwZjIzOThmNmI3NWIyNWIxNTNkNCIsInN1YiI6IjY1MDIxZDAxZmZjOWRlMGVlM2M2OTNmNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hSX4QPoJ3hnfKIInpH_-I3M0XD-mhi7e9zBFCKWI-zg",
    accept: "application/json",
  },
};

let topRatedMovies = {};

fetch("https://api.themoviedb.org/3/movie/top_rated", option)
  .then((response) => response.json())
  .then((response) => {
    console.log(response);

    topRatedMovies = response;
  })
  .catch((e) => {
    console.log(e);
  });
