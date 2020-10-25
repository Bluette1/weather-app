import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/index.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import NavBar from './layouts/navbar';
import displayContent from './layouts/content';

const API_KEY = process.env.APIKEY;
const city = localStorage.getItem('city') ? JSON.parse(localStorage.getItem('city')) : 'London';
const units = localStorage.getItem('units') ? JSON.parse(localStorage.getItem('units')) : 'metric';

const windowReload = (field, value) => {
  localStorage.setItem(field, JSON.stringify(value));
  window.location.reload();
};

const url = 'https://api.openweathermap.org/data/2.5/weather?';
const rootElement = document.querySelector('#root');
rootElement.classList.add('hidden');

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
  const urlPath = `${url}q=${city}&appid=${API_KEY}&units=${units}`;

  NavBar.displayNavbar(rootElement, urlPath, units);
  displayContent(rootElement, urlPath, units);

  window.addEventListener('load', () => {
    setTimeout(() => {
      loadingComponent.classList.add('hidden');
      rootElement.classList.remove('hidden');
    }, 3000);
  });

  const searchBtn = document.querySelector('#search-btn');
  const inputSearch = document.querySelector('#input-search');
  const searchForm = document.querySelector('#search-form');
  const celsius = document.querySelector('#celsius');
  const farenheight = document.querySelector('#farenheight');

  farenheight.addEventListener('click', () => {
    if (farenheight.checked === true) {
      windowReload('units', 'imperial');
    }
  });
  celsius.addEventListener('click', () => {
    if (celsius.checked === true) {
      windowReload('units', 'metric');
    }
  });
  searchBtn.addEventListener('click', (evt) => {
    evt.preventDefault();
    windowReload('city', inputSearch.value);
    searchForm.reset();
  });
};

start();