const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = 'https://image.tmdb.org/t/p/w500';
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main = document.querySelector('main');
const form = document.querySelector('form');
const sortBtn = document.querySelector('.sorting');
const wrapper = document.querySelectorAll('.wrapper');
let dataResponse;
let renderArr = [];

getMovies(APIURL);
async function getMovies(url) {
  const response = await fetch(url);
  dataResponse = await response.json();
  arrayOfMovies = dataResponse.results;

  showMovies(arrayOfMovies);
}

showMovies = (data) => {
  renderArr = [];
  main.innerHTML = '';
  renderSlickBtn()

  const next = document.querySelector('.slick_next');
  const prev = document.querySelector('.slick_prev');
  let slideIndex = 0;

  let fetchedMovies = data;
  let chunkQuantity = 4;
  for (let i = 0; i < fetchedMovies.length; i += chunkQuantity) {
    renderArr.push(fetchedMovies.slice(i, chunkQuantity + i))
  }
  renderArr[slideIndex].forEach(element => {
    const { poster_path, title, vote_average } = element;

    if (poster_path) {

      const movie = document.createElement('div');
      movie.classList.add('movie');
      movie.style.display = 'block'
      main.appendChild(movie);
      movie.innerHTML = `
    <div class="wrapper">
        <img src="${IMGPATH + poster_path}" alt="">
        <div class="${colorVote(vote_average)} vote_average">${vote_average}</div>
    </div>
    <div class="movie_info">${title}</div>
    `
    }
  });

  showPages();
  function showPages() {
    renderArr.forEach((item,idx) => {
      const page = document.createElement('div');
      page.classList.add('page');
      page.textContent = idx + 1;
      main.appendChild(page)
      console.log(page)
    });
  }


  function sliderShow(n) {
    slideIndex += n;
    let film = document.querySelectorAll('.movie')
    film.forEach(item => item.style.display = 'none')
    if (slideIndex > renderArr.length - 1) {
      slideIndex = 0
    } if (slideIndex < 0) {
      slideIndex = renderArr.length - 1;
    }
    renderArr[slideIndex].forEach(element => {
      const { poster_path, title, vote_average } = element;
      if (poster_path) {
        const movie = document.createElement('div');
        const offer = document.createElement('div');
        movie.classList.add('movie');
        offer.classList.add('offer');
        movie.style.display = 'block'
        main.appendChild(movie);
        movie.innerHTML = `
      <div class="wrapper">
          <img src="${IMGPATH + poster_path}" alt="">
          <div class="${colorVote(vote_average)} vote_average">${vote_average}</div>
      </div>
      <div class="movie_info">${title}</div>
      `
      }
    });
  }

  next.addEventListener('click', () => {
    sliderShow(+1)
  });

  prev.addEventListener('click', () => {
    sliderShow(-1)
  });
}

function renderSlickBtn() {
  const back = document.createElement('div')
  const forward = document.createElement('div')
  back.classList.add('slick_prev');
  back.innerHTML = '<i class="fa-solid fa-angle-left"></i>';
  forward.classList.add('slick_next');
  forward.innerHTML = '<i class="fa-solid fa-angle-right"></i>';
  main.append(forward);
  main.prepend(back)

}

function colorVote(info) {
  if (info >= 8) {
    return 'green'
  } if (info > 6) {
    return 'orange'
  } else return 'red'
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const value = search.value;
  getMovies(SEARCHAPI + value);
});

sortBtn.addEventListener('click', async () => {
  renderArr = arrayOfMovies.sort((a, b) => b.vote_average - a.vote_average);
  showMovies(renderArr);
});
