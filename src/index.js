import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/index.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import NavBar from './layouts/navbar';
import {
  displayContent,
  toggleUnits,
} from './layouts/content';
import weatherInfo from './helpers/proxyHelper';

const city = localStorage.getItem('city') ? JSON.parse(localStorage.getItem('city')) : 'London';
const units = 'metric';
let weatherData = localStorage.getItem('weatherData') ? JSON.parse(localStorage.getItem('weatherData')) : null;
const rootElement = document.querySelector('#root');
rootElement.classList.add('hidden');

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

const addEventListeners = () => {
  const searchBtn = document.querySelector('#search-btn');
  const displayWeatherInfo = document.querySelector('#weather-info');
  const temp = document.querySelector('#temp');
  const tempUnits = document.querySelector('#temp-units');
  const feelsLike = document.querySelector('#feels-like');

  const inputSearch = document.querySelector('#input-search');
  const searchForm = document.querySelector('#search-form');
  const celsius = document.querySelector('#celsius');
  const farenheight = document.querySelector('#farenheight');

  farenheight.addEventListener('click', () => {
    if (farenheight.checked === true) {
      const weatherObj = checkUnits(weatherData, 'imperial');
      NavBar.toggleUnits(weatherObj, displayWeatherInfo, 'imperial');
      toggleUnits(temp, tempUnits, feelsLike, weatherObj, 'imperial');
    }
  });
  celsius.addEventListener('click', () => {
    if (celsius.checked === true) {
      const weatherObj = checkUnits(weatherData, 'metric');
      NavBar.toggleUnits(weatherObj, displayWeatherInfo, 'metric');
      toggleUnits(temp, tempUnits, feelsLike, weatherObj, 'metric');
    }
  });
  searchBtn.addEventListener('click', (evt) => {
    evt.preventDefault();
    weatherData = null;
    windowReload('city', inputSearch.value);
    searchForm.reset();
  });
};

const addContent = (loadingContainer) => {
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
  const loadingContainer = document.createElement('div');
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
    addContent(loadingContainer);
  } else {
    weatherInfo(city, (error, data) => {
      if (!error && data) {
        weatherData = data;
        addContent(loadingContainer);
      }
    });
  }
};

start();