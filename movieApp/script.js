const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = 'https://image.tmdb.org/t/p/w500';
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
const GENREAPI = 'https://api.themoviedb.org/3/genre/movie/list?api_key=04c35731a5ee918f014970082a0088b1&query=';
const APIKEY = 'api_key=04c35731a5ee918f014970082a0088b1&query=';

const main = document.querySelector('main');
const form = document.querySelector('#form');
const search = document.querySelector('#search');
const btnRate = document.querySelector('.sortRate');
const btnRelease = document.querySelector('.sortRelease');
const btnTrailer = document.querySelector('.film_trailer');
const img = document.querySelectorAll('img');
const preview = document.querySelector('.overview');

let selectedGenres = [];
let responseMovie;
let responseIdGenre;
let responseTrailer;

getMoviesGenreId(GENREAPI)
async function getMoviesGenreId(url) {
  const response = await fetch(url);
  responseIdGenre = await response.json();
  showGenres(responseIdGenre.genres);
}

console.log(getMovies(APIURL));
async function getMovies(url) {
  const response = await fetch(url);
  responseMovie = await response.json();
  console.log(responseMovie);
  showMovies(responseMovie);
}

async function getMovieTrailer(movieId) {
  console.log(movieId);
 const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=04c35731a5ee918f014970082a0088b1&page=1`);
 responseTrailer = await response.json();
console.log(responseTrailer)
 return responseTrailer
}





const showMovies = (movie) => {
  main.innerHTML = '';

  movie.results.forEach(element => {
    const { poster_path, title, vote_average, release_date, overview, id } = element;
    if (poster_path) {
      let film = document.createElement('div');
      film.classList.add('movie');
      film.addEventListener('click', (e) => {
        const target = e.target;
        if (target && target.classList.contains('img_overview')) {
          target.nextElementSibling.nextElementSibling.style.display = 'block';
        }
        if (target.matches('button.close_modal')) {
          target.parentElement.parentElement.style.display = 'none';
        }
        if (target.classList.contains('overlay')) {
          target.style.display = 'none'
        }
        if (target.id == id) {
          const emedKey = getMovieTrailer(id);
          console.log(emedKey)

        }
      });
      film.innerHTML = `
        <img class="img_overview" id="${id}" src="${IMGPATH + poster_path}" alt="">
          <div class="movie_info">
              <h3>${title}</h3>
              <span class='${getClassByRate(vote_average)}'>${formatVote(vote_average)}</span>
              <span>Release date ${release_date}</span>
          </div>
          <div class="overlay">
            <div class="overview modal">
              <button data-close class="close_modal">&times;</button>
              <div class="film_card">
                <img class="img_overview film_img" src="${IMGPATH + poster_path}" alt="">
                <div class="film_info">
                  <h2 class="film_name">${title}</h2>
                  <p class="film_about">${overview}</p>
                  <p class="film_rate">Vote average: ${vote_average}</p>
                  <a class="link film_trailer" href="https://www.youtube.com/embed/" target="_blank">Watch trailer</a>
                </div>
              </div>
            </div>
          </div>
          `
      
      main.appendChild(film)
    }
  });
}



function showGenres(listId) {
  const genres = document.createElement('div');
  const arrGenresId = listId;

  genres.classList.add('genres');

  arrGenresId.forEach(item => {
    const tag = document.createElement('tag');
    tag.textContent = item.name;
    tag.id = item.id;
    genres.appendChild(tag);
    main.before(genres);
    tag.addEventListener('click', () => {
      if (selectedGenres.includes(tag.id)) {
        selectedGenres.forEach((id, index) => {
          if (tag.id == id) {
            selectedGenres.splice(index, 1);
            tag.classList.remove('active');
          }
        });
      } else {
        selectedGenres.push(tag.id);
        tag.classList.add('active');
        showClearBtn(genres);
        console.log(selectedGenres);

      }
      getMovies(APIURL + '&with_genres=' + selectedGenres.join(','));
    });
  });
}

function showClearBtn(genres) {
  const tag = document.querySelectorAll('tag');
  let clearTag = document.querySelector('.clear')
  if (clearTag) {
    clearTag.classList.add('clear');
  } else {
    const clearBtn = document.createElement('tag');
    clearBtn.textContent = 'Clear genres';
    clearBtn.classList.add('clear');
    genres.appendChild(clearBtn);
    clearBtn.addEventListener('click', () => {
      selectedGenres = [];
      tag.forEach(item => item.classList.remove('active'));
      getMovies(APIURL);
      clearBtn.remove();
    });
  }

}

function sortByRate(movie) {
  movie.results.sort((a, b) => b.vote_average - a.vote_average);
  showMovies(movie);
}

function sortByRelease(movie) {
  movie.results.sort((a, b) => a.release_date > b.release_date ? -1 : 0);
  showMovies(movie);
}

function getClassByRate(rate) {
  if (rate >= 8) {
    return 'blue';
  } if (rate > 6) {
    return 'orange';
  } else return 'red'
}

function formatVote(rating) {
  let rate = rating;
  if (rate == 0) {
    return rate = 'Not rated'
  } else return rating
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  getMovies(SEARCHAPI + searchTerm);
  search.value = "";

});

btnRate.addEventListener('click', () => {
  sortByRate(responseMovie)
});

btnRelease.addEventListener('click', () => {
  sortByRelease(responseMovie)
});




