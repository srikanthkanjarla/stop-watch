const secondsElement = document.getElementById('seconds');
const minutesElement = document.getElementById('minutes');
const hoursElement = document.getElementById('hours');
const pastTimesElement = document.getElementById('add-recorder-time');
const startTimerElement = document.getElementById('start-stop-timer');
const resetTimerElement = document.getElementById('reset-timer');
const recordTimerElement = document.getElementById('record-timer');

let timerStatus = false;
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
    seconds += 1;

    if (minutes === 60) {
      hours += 1;
      minutes = 0;
    }

    if (seconds === 60) {
      minutes += 1;
      seconds = 0;
    }
    const timerObj = toDoubleDigit(seconds, minutes, hours);
    secondsElement.innerHTML = timerObj.sec;
    minutesElement.innerHTML = timerObj.min;
    hoursElement.innerHTML = timerObj.hour;
  }, 1000);
}

function stopTimer() {
  clearInterval(intervalId);
}

function resetTimer() {
  clearInterval(intervalId);
  seconds = 0;
  minutes = 0;
  hours = 0;
  pastTimesElement.innerHTML = '';
  timerStatus = true;
  runTimer();
}

function recordTime() {
  const timeObj = toDoubleDigit(seconds, minutes, hours);
  pastTimesElement.innerHTML += `<li>${timeObj.hour} : ${timeObj.min} : ${timeObj.sec}</li>`;
}

startTimerElement.addEventListener('click', () => {
  timerStatus = !timerStatus;
  if (timerStatus) {
    runTimer();
  } else {
    stopTimer();
  }
});

resetTimerElement.addEventListener('click', () => resetTimer());
recordTimerElement.addEventListener('click', () => recordTime());
