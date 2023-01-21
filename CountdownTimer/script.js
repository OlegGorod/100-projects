const deadline = '1 Jan 2024';


const daysEl = document.querySelector('#days');
const hoursEl = document.querySelector('#hours');
const minsEl = document.querySelector('#mins');
const secondsEl = document.querySelector('#seconds');

function countdown() {
    const newYearsDate = new Date(deadline);
    const currentDate = new Date();
    let totalSeconds = (newYearsDate - currentDate) / 1000;
    let days = Math.floor(totalSeconds / 60 / 60 / 24);
    let hours = Math.floor((totalSeconds / 60 / 60) % 24);
    let minutes = Math.floor((totalSeconds / 60) % 60);
    let seconds = Math.floor(totalSeconds % 60);

    if(totalSeconds <= 0) {
        days = 0;
        hours = 0;
        minutes = 0;
        seconds = 0;
        clearInterval(timeInterval);
    }

    daysEl.textContent = days;
    hoursEl.textContent = formatTime(hours);
    minsEl.textContent = formatTime(minutes);
    secondsEl.textContent = formatTime(seconds);
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

const timeInterval = setInterval(countdown, 1000);
countdown();

