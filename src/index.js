import './css/styles.css';
import API from './RestAPI';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputCountryEl = document.querySelector('#search-box');
const listCountryEl = document.querySelector('.country-list');
const infoCountryEl = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

inputCountryEl.addEventListener(
  'input',
  debounce(onGetsCountries, DEBOUNCE_DELAY)
);

function onGetsCountries(e) {
  clearOutputField();
  let searchCountryValue = e.target.value.trim();
  if (!searchCountryValue) {
    return;
  }
  API.fetchCountries(searchCountryValue)
    .then(renderResult)
    .catch(rejectedResult);
}

function clearOutputField() {
  listCountryEl.innerHTML = '';
  infoCountryEl.innerHTML = '';
}

function renderResult(result) {
  const resultLength = result.length;
  if (resultLength > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
    return;
  }
  if (resultLength >= 2 && resultLength <= 10) {
    listCountryEl.insertAdjacentHTML('beforeend', nameCountry(result));
    return;
  }

  infoCountryEl.insertAdjacentHTML('beforeend', infoCountry(result));
}
function nameCountry(result) {
  return result.map(
    obj =>
      `<li><img src = "${obj.flags.svg}" width=30 height=20> "${obj.name.official}"</li>`
  );
}

function infoCountry(result) {
  return result.map(
    obj =>
      `<li><img src = "${obj.flags.svg}" width=30 height=20> ${
        obj.name.official
      }</li> 
  <li>capital: ${obj.capital.join('')}</li>
  <li>population: ${obj.population}</li>
  <li>languages: ${Object.values(obj.languages).join('')}</li>`
  );
}

function rejectedResult() {
  Notify.failure('Oops, there is no country with that name');
}
