const formEl = document.querySelector('.form');

let amountOfPromise = 1;
let totalDelay = Number(0);

formEl.addEventListener('submit', oncreatePromises);

function oncreatePromises(e) {
  e.preventDefault();
  let delayThisStep = Number(formEl.elements.step.value);
  let startDelay = Number(formEl.elements.delay.value);
  let totalAmountOfPromise = Number(formEl.elements.amount.value);
  let thisPromise;

  for (let i = 0; i < totalAmountOfPromise; i++) {
    if (amountOfPromise === 1) {
      totalDelay += startDelay;
      thisPromise = createPromise(amountOfPromise, totalDelay);
      returnResultOfPromise(thisPromise, amountOfPromise, totalDelay);
    } else {
      totalDelay += delayThisStep;
      thisPromise = createPromise(amountOfPromise, totalDelay);
      returnResultOfPromise(thisPromise, amountOfPromise, totalDelay);
    }
    amountOfPromise++;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}

function returnResultOfPromise(thisPromise, position, delay) {
  thisPromise
    .then(() => {
      console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(() => {
      console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}
