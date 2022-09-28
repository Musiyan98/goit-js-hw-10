import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const inputDateEl = document.querySelector('#datetime-picker');
const startTimerEl = document.querySelector('button');
const outputTimeEl = {
  seconds: document.querySelector('span[data-seconds]'),
  minutes: document.querySelector('span[data-minutes]'),
  hours: document.querySelector('span[data-hours]'),
  days: document.querySelector('span[data-days]'),
};

let selectedDatesUnix;
let intervalId;

startTimerEl.setAttribute('disabled', '');

startTimerEl.addEventListener('click', timerRun);

const timerFlatpickrOptions = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    checkValidDate(selectedDates[0]);
    selectedDatesUnix = selectedDates[0].getTime();
    clearInterval(intervalId);
    insertOutputData();
  },
};

flatpickr(inputDateEl, timerFlatpickrOptions);

function checkValidDate(selectedDates) {
  if (selectedDates > Date.now()) {
    startTimerEl.removeAttribute('disabled');
    return;
  }
  alert('Please choose a date in the future');

  startTimerEl.setAttribute('disabled', '');
}

function timerRun() {
  startTimerEl.setAttribute('disabled', '');
  intervalId = setInterval(() => {
    let nowTime = Date.now();
    let msTimeDifference = selectedDatesUnix - nowTime;
    let outputData = convertMs(msTimeDifference);
    insertOutputData(outputData);
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function insertOutputData(
  { days, hours, minutes, seconds } = {
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  }
) {
  outputTimeEl.seconds.innerHTML = seconds;
  outputTimeEl.minutes.innerHTML = minutes;
  outputTimeEl.hours.innerHTML = hours;
  outputTimeEl.days.innerHTML = days;
}

function addLeadingZero(el) {
  return String(el).padStart(2, '0');
}

console.log(
  'в умові завдання було вказано що перезапустити можна лише перезавантаживши сторінку, проте все ж в мене стоять базові умови валідації, так сказати, і якщо спробувати змінити дату, то поточний таймер зупиняється, всі поля обнуляються, ну і звичайно ж після запуску таймера "старт" дизейблиться'
);
