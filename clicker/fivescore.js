const display = document.querySelector('#display');
const click = document.querySelector('#clicker');
const start = document.querySelector('#start');
const counter = document.querySelector('#counter');

let clicks = 0;
const TIMEOUT = 7000;

function formatTime(ms) {
     return (ms / 1000).toFixed(2);
}

function clicker() {
    const startTime = Date.now();
    
    const interval = setInterval(() => {
        const timePassed = Date.now() - startTime;
        display.textContent = formatTime(TIMEOUT - timePassed);
        click.onclick = function() {
            clicks++;
        };
        counter.textContent = clicks;
    });

    setTimeout(() => {
        display.textContent = 'Game Over';
        click.onclick = null;
        clearInterval(interval);
        clicks = 0;
    }, TIMEOUT);

}

start.onclick = clicker;


