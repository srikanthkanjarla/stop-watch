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
  pastTimesElement.innerHTML += `<li>${hours} : ${minutes} : ${seconds}</li>`;
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
