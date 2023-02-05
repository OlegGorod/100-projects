const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = 'https://image.tmdb.org/t/p/w500';
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";


const main = document.querySelector('main');
const form = document.querySelector('#form');
const search = document.querySelector('#search');
const btnRate = document.querySelector('.sortRate');
const btnRelease = document.querySelector('.sortRelease');
const img = document.querySelectorAll('img');
const preview = document.querySelector('.overview');
let respData;

getMovies(APIURL);
async function getMovies(url) {
  const response = await fetch(url);
  respData = await response.json();
  console.log(respData);
  showSearch(respData);
}

const showSearch = (movie) => {
  main.innerHTML = '';

  movie.results.forEach(element => {
    const { poster_path, original_title, vote_average, release_date, overview } = element;
    console.log(overview)
    if (poster_path) {
      let film = document.createElement('div');
      film.classList.add('movie');
      film.innerHTML = `
      <img class="img_overview" src="${IMGPATH + poster_path}" alt="">
          <div class="movie_info">
              <h3>${original_title}</h3>
              <span class='${getClassByRate(vote_average)}'>${vote_average}</span>
              <span>Release date ${release_date}</span>
          </div>
          <div class="overview">${overview}</div>
      
      `
      main.appendChild(film)
    }
    
  });
  
}

function sortByRate(movie) {
  movie.results.sort((a, b) => b.vote_average - a.vote_average);
  showSearch(movie);
}

function sortByRelease(movie) {
  movie.results.sort((a, b) => a.release_date > b.release_date ? -1 : 0);
  showSearch(movie);
}

function getClassByRate(rate) {
  if (rate >= 8) {
    return 'blue';
  } if (rate > 6) {
    return 'orange';
  } else return 'red'
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  getMovies(SEARCHAPI + searchTerm);
  search.value = "";
});

btnRate.addEventListener('click', () => {
  sortByRate(respData)
});

btnRelease.addEventListener('click', () => {
  sortByRelease(respData)
});


