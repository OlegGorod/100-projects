const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = 'https://image.tmdb.org/t/p/w500';
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
const GENREAPI = 'https://api.themoviedb.org/3/genre/movie/list?api_key=04c35731a5ee918f014970082a0088b1&query='


const main = document.querySelector('main');
const form = document.querySelector('#form');
const search = document.querySelector('#search');
const btnRate = document.querySelector('.sortRate');
const btnRelease = document.querySelector('.sortRelease');
const img = document.querySelectorAll('img');
const preview = document.querySelector('.overview');

let selectedGenres = [];
let respData;
let responseId;

getMoviesGenreId(GENREAPI)
async function getMoviesGenreId(url) {
  const response = await fetch(url);
  responseId = await response.json();
  showGenres(responseId.genres);
}
console.log(responseId)

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
    const { poster_path, title, vote_average, release_date, overview } = element;
    if (poster_path) {
      let film = document.createElement('div');
      film.classList.add('movie');
      film.innerHTML = `
        <img class="img_overview" src="${IMGPATH + poster_path}" alt="">
          <div class="movie_info">
              <h3>${title}</h3>
              <span class='${getClassByRate(vote_average)}'>${vote_average}</span>
              <span>Release date ${release_date}</span>
          </div>
          <div class="overview">${overview}</div>
          `
      film.addEventListener('click', (e) => {
        const target = e.target;
        if (target && target.classList.contains('img_overview')) {
          target.nextElementSibling.nextElementSibling.classList.add('show')
          console.log(target.nextElementSibling.nextElementSibling)
        }
        if (target.matches('div.overview')) {
          target.classList.remove('show');
        }
      });
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
    clearBtn.classList.add('clear')
    genres.appendChild(clearBtn);
    clearBtn.addEventListener('click', () => {
      selectedGenres = [];
      tag.forEach(item => item.classList.remove('active'))
      getMovies(APIURL)
      clearBtn.remove();
      
    });
  }       

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


