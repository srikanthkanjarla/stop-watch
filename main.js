const secondsElement = document.getElementById('seconds');
const minutesElement = document.getElementById('minutes');
const hoursElement = document.getElementById('hours');
const countDownElement = document.getElementById('count-down');
const recordTimeElement = document.getElementById('recorded-item');
/* action buttons */

const startButton = document.getElementById('start-stop-timer');
const resetButton = document.getElementById('reset-timer');
const recordButton = document.getElementById('record-timer');

let timerStatus = false;
let countDown = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;
let intervalId;

/* if time is < 10 add leading zero */
function toDoubleDigit(sec, min, hour) {
  const s = sec < 10 ? `0${sec}` : sec;
  const m = min < 10 ? `0${min}` : min;
  const h = hour < 10 ? `0${hour}` : hour;
  return { sec: s, min: m, hour: h };
}

function runTimer() {
  intervalId = setInterval(() => {
    countDown += 1;
    if (countDown === 100) {
      seconds += 1;
      countDown = 0;
    }
    if (minutes === 60) {
      hours += 1;
      minutes = 0;
    }

    if (seconds === 60) {
      minutes += 1;
      seconds = 0;
    }
    const timerObj = toDoubleDigit(seconds, minutes, hours);
    countDownElement.innerHTML = countDown;
    secondsElement.innerHTML = timerObj.sec;
    minutesElement.innerHTML = timerObj.min;
    hoursElement.innerHTML = timerObj.hour;
  }, 10);
}

function stopTimer() {
  clearInterval(intervalId);
}

function resetTimer() {
  clearInterval(intervalId);
  seconds = 0;
  minutes = 0;
  hours = 0;
  recordTimeElement.innerHTML = '';
  timerStatus = true;
  runTimer();
}

function recordTime() {
  const timeObj = toDoubleDigit(seconds, minutes, hours);
  const recSec = timeObj.sec !== 0 ? `${timeObj.sec}<span class='time-unit'>s</span>` : '';
  const recMin = minutes !== 0 ? `${timeObj.min}<span class='time-unit'>m</span>` : '';
  const recHour = hours !== 0 ? `${timeObj.hour}<span class='time-unit'>h</span>` : '';
  const counter = countDown < 10 ? `0${countDown}` : countDown;
  recordTimeElement.innerHTML += `<li>${recHour} ${recMin} ${recSec} <span class="counter">${counter}</span> </li>`;
}
/* eslint arrow-parens: [2, "as-needed"] */
startButton.addEventListener('click', e => {
  timerStatus = !timerStatus;
  e.target.textContent = e.target.textContent === 'Start' ? 'Stop' : 'Start';
  if (timerStatus) {
    runTimer();
  } else {
    stopTimer();
  }
});

resetButton.addEventListener('click', () => resetTimer());
recordButton.addEventListener('click', () => recordTime());
