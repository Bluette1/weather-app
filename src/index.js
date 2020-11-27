import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/index.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import NavBar from './layouts/navbar';
import {
  displayContent,
  toggleUnits,
} from './layouts/content';
import weatherInfo from './helpers/apiHelper';

const city = localStorage.getItem('city') ? JSON.parse(localStorage.getItem('city')) : 'London';
const units = localStorage.getItem('units') ? localStorage.getItem('units') : 'metric';
let weatherData = localStorage.getItem('weatherData') ? JSON.parse(localStorage.getItem('weatherData')) : null;
const rootElement = document.querySelector('#root');
rootElement.classList.add('hidden');
const loadingContainer = document.createElement('div');
let displayWeatherInfo;
let temp;
let tempUnits;
let feelsLike;

const windowReload = (field, value) => {
  localStorage.setItem(field, JSON.stringify(value));
  localStorage.setItem('weatherData', '');
  window.location.reload();
};

const checkUnits = (data, unit = units) => {
  let weatherInfo;

  if (unit === 'metric') {
    weatherInfo = data.metricResults;
  } else {
    weatherInfo = data.imperialResults;
  }
  return weatherInfo;
};

const toggleTempUnits = (unit = units) => {
  localStorage.setItem('units', unit);
  const weatherObj = checkUnits(weatherData, unit);
  NavBar.toggleUnits(weatherObj, displayWeatherInfo, unit);
  toggleUnits(temp, tempUnits, feelsLike, weatherObj, unit);
};

const addEventListeners = () => {
  const searchBtn = document.querySelector('#search-btn');
  displayWeatherInfo = document.querySelector('#weather-info');
  temp = document.querySelector('#temp');
  tempUnits = document.querySelector('#temp-units');
  feelsLike = document.querySelector('#feels-like');

  const inputSearch = document.querySelector('#input-search');
  const searchForm = document.querySelector('#search-form');
  const celsius = document.querySelector('#celsius');
  const farenheight = document.querySelector('#farenheight');

  farenheight.addEventListener('click', () => {
    if (farenheight.checked === true) {
      toggleTempUnits('imperial');
    }
  });
  celsius.addEventListener('click', () => {
    if (celsius.checked === true) {
      toggleTempUnits('metric');
    }
  });
  searchBtn.addEventListener('click', (evt) => {
    evt.preventDefault();
    weatherData = null;
    windowReload('city', inputSearch.value);
    searchForm.reset();
  });
};

const addContent = () => {
  loadingContainer.remove();
  rootElement.classList.remove('hidden');
  const weatherObj = checkUnits(weatherData);
  NavBar.displayNavbar(rootElement, weatherObj, units);
  displayContent(rootElement, weatherObj, units);
  addEventListeners();
};

const start = () => {
  rootElement.innerHTML = '';
  const body = document.querySelector('body');
  loadingContainer.setAttribute('class', 'd-flex justify-content-center align-items-center loading-component text-primary');
  const loadingComponent = document.createElement('div');

  loadingComponent.setAttribute('class', 'spinner-border');
  loadingComponent.setAttribute('role', 'status');
  const loadText = document.createElement('strong');
  loadText.className = 'p-2';

  loadText.textContent = 'Loading...Please wait.';
  loadingContainer.append(loadingComponent);
  loadingContainer.append(loadText);
  body.append(loadingContainer);
  if (weatherData && weatherData !== '') {
    addContent();
  } else {
    weatherInfo(city, (error, data) => {
      if (!error && data) {
        weatherData = data;
        addContent();
      }
    });
  }
};

start();