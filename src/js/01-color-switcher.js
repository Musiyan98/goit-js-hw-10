const startButtonEl = document.querySelector('button[data-start]');
const stopButtonEl = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');

let intervalId = null;

startButtonEl.addEventListener('click', onStartColorChange);
stopButtonEl.addEventListener('click', onStopColorChange);

function onStartColorChange() {
  startButtonEl.setAttribute('disabled', '');
  changeColor();
  intervalId = setInterval(changeColor, 1000);
}

function onStopColorChange() {
  startButtonEl.removeAttribute('disabled');
  clearInterval(intervalId);
}

function changeColor() {
  let bgColor = getRandomHexColor();
  bodyEl.style.backgroundColor = bgColor;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
