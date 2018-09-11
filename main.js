const secondsElement = document.getElementById('seconds');
const minutesElement = document.getElementById('minutes');
const hoursElement = document.getElementById('hours');
const startTimerElement = document.getElementById('start-stop-timer');

let timerStatus = false;
let seconds = 0;
let minutes = 0;
let hours = 0;
let intervalId;

function runTimer() {
  intervalId = setInterval(() => {
    seconds += 1;

    if (minutes === 60) {
      hours += 1;
      minutes = 0;
    }

    if (seconds === 60) {
      minutes += 1;
      seconds = 0;
    }

    secondsElement.innerHTML = seconds < 10 ? `0${seconds}` : seconds;
    minutesElement.innerHTML = minutes < 10 ? `0${minutes}` : minutes;
    hoursElement.innerHTML = hours < 10 ? `0${hours}` : hours;
  }, 1000);
}

function stopTimer() {
  clearInterval(intervalId);
}

startTimerElement.addEventListener('click', () => {
  timerStatus = !timerStatus;
  if (timerStatus) {
    runTimer();
  } else {
    stopTimer();
  }
});
