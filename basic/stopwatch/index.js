const timedisplay = document.querySelector('.stopwatch');
const startbtn = document.querySelector('#start');
const stopbtn = document.querySelector('#stop');
const resetbtn = document.querySelector('#reset');
let starttime = 0;
let paused = false;
let elapsedtime = 0;
let timeinterval = 0;
let min = 0;
let sec = 0;
let hours = 0;

startbtn.addEventListener('click', () => {
    if (!paused) {
        paused = true;
        starttime = Date.now() - elapsedtime;
        timeinterval = setInterval(updatetime, 10);
    }

    function updatetime() {
        //since it returns in miliseconds
        elapsedtime = Date.now() - starttime;

        sec = Math.floor((elapsedtime / 1000) % 60);
        min = Math.floor((elapsedtime / 60000) % 60);
        hours = Math.floor((elapsedtime / 3600000) % 60);

        timedisplay.textContent = `${hours < 10 ? '0' + hours : hours}:${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`;
    }
});

stopbtn.addEventListener('click', () => {
    if (paused) {
        paused = false;
        elapsedtime = Date.now() - starttime;
        clearInterval(timeinterval);
    }
});

resetbtn.addEventListener('click', () => {
    if (!paused) {
        clearInterval(timeinterval);
        sec = 0;
        min = 0;
        hours = 0;
        elapsedtime = 0;
        starttime = 0;
        timedisplay.textContent = "00:00:00";
    }
});



