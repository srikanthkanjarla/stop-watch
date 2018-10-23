/* access html elements */
const secondsElement = document.getElementById('seconds');
const minutesElement = document.getElementById('minutes');
const hoursElement = document.getElementById('hours');
const countDownElement = document.getElementById('count-down');
const recordTimeElement = document.getElementById('recorded-item');

/* action buttons */
const startButton = document.getElementById('start-stop-timer');
const resetButton = document.getElementById('reset-timer');
const recordButton = document.getElementById('record-timer');

/* Global variables  */
let timerStatus = false;
let countDown = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;
let intervalId;

/* if time is < 10 add leading zero */
function toDoubleDigit(sec, min, hour, count) {
  const s = sec < 10 ? `0${sec}` : sec;
  const m = min < 10 ? `0${min}` : min;
  const h = hour < 10 ? `0${hour}` : hour;
  const c = count < 10 ? `0${count}` : count;
  return {
    sec: s,
    min: m,
    hour: h,
    count: c,
  };
}

/* update stop watch timer */
function displayWatchTime(timeObj) {
  countDownElement.innerHTML = timeObj.count;
  secondsElement.innerHTML = timeObj.sec;
  minutesElement.innerHTML = timeObj.min;
  hoursElement.innerHTML = timeObj.hour;
}

/* start timer */
function startTimer() {
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
    const timerObj = toDoubleDigit(seconds, minutes, hours, countDown);
    displayWatchTime(timerObj);
  }, 10);
}

/* stop stopwatch */
function stopTimer() {
  clearInterval(intervalId);
}

/* reset stopwatch */
function resetTimer() {
  clearInterval(intervalId);
  seconds = 0;
  minutes = 0;
  hours = 0;
  countDown = 0;
  const timeObj = toDoubleDigit(seconds, minutes, hours, countDown);
  displayWatchTime(timeObj);
  startButton.textContent = 'Start';
  startButton.classList.remove('btn-stop');
  startButton.classList.add('btn-start');
  recordTimeElement.innerHTML = '';
  timerStatus = false;
}

/* record time for that moment */
function recordTime() {
  const timeObj = toDoubleDigit(seconds, minutes, hours);
  const recSec = timeObj.sec !== 0 ? `${timeObj.sec}<span class='time-unit'>s</span>` : '';
  const recMin = minutes !== 0 ? `${timeObj.min}<span class='time-unit'>m</span>` : '';
  const recHour = hours !== 0 ? `${timeObj.hour}<span class='time-unit'>h</span>` : '';
  const counter = countDown < 10 ? `0${countDown}` : countDown;
  recordTimeElement.innerHTML += `<li>${recHour} ${recMin} ${recSec} <span class="counter">${counter}</span> </li>`;
}
/* Event listeners */
/* eslint arrow-parens: [2, "as-needed"] */
startButton.addEventListener('click', e => {
  timerStatus = !timerStatus;
  e.target.textContent = e.target.textContent === 'Start' ? 'Stop' : 'Start';
  if (timerStatus) {
    startTimer();
    e.target.classList.toggle('btn-stop');
  } else {
    stopTimer();
    e.target.classList.toggle('btn-stop');
  }
});

resetButton.addEventListener('click', () => resetTimer());

recordButton.addEventListener('click', () => recordTime());
