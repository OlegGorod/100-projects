const form = document.querySelector('#form');
const main = document.querySelector('#main')

const API_KEY = "3265874a2c77ae4a04bb96236a642d2f";

const url = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`

async function getWeather(city) {
    const response = await fetch(url(city));
    const respData = await response.json();
    console.log(respData)
    renderWeather(respData)
}

function filterTemp(temp) {
    return Math.floor(temp - 273.15)
}

function renderWeather(data) {
    const temperature = filterTemp(data.main.temp);
    const weather = document.createElement('div')
    weather.classList.add('weather');
    weather.innerHTML = `
    <h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> ${temperature}°C</h2>
    <small>${data.weather[0].main}</small>
`;
    console.log(temperature)
    main.innerHTML = ''
    main.appendChild(weather);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let result = search.value;
    getWeather(result)

})




