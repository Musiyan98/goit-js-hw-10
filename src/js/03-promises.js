const formEl = document.querySelector('.form');
const delayInputEl = document.querySelector('input[name="delay"]');
const stepInputEl = document.querySelector('input[name="step"]');
const amountInputEl = document.querySelector('input[name="amount"]');

let amountOfPromise;
let delayThisStep;

formEl.addEventListener('submit', createPromise);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
  } else {
    // Reject
  }
}
