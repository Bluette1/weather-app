import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/index.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import NavBar from './layouts/navbar';
import displayContent from './layouts/content';

const API_KEY = process.env.APIKEY;

const defaultCity = 'London';
const city = defaultCity;
const url = 'https://api.openweathermap.org/data/2.5/weather?';
const rootElement = document.querySelector('#root');
rootElement.classList.add('hidden');


const start = (city, units = 'metric') => {

  rootElement.innerHTML = '';
  const body = document.querySelector('body');
  const loadingContainer = document.createElement('div');
  loadingContainer.setAttribute('class', 'd-flex justify-content-center align-items-center loading-component')
  const loadingComponent = document.createElement('div');

  loadingComponent.setAttribute('class', 'spinner-border');
  loadingComponent.setAttribute('role', 'status');
  loadingContainer.append(loadingComponent);
  body.append(loadingContainer);
  const urlPath = `${url}q=${city}&appid=${API_KEY}&units=${units}`;

  NavBar.displayNavbar(rootElement, urlPath, units);
  displayContent(rootElement, urlPath, units);


  window.addEventListener('load', function() {

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
      start(city, 'imperial');
    }
  });
  celsius.addEventListener('click', () => {

    if (celsius.checked === true) {
      start(city, 'metric');
    }
  });
  searchBtn.addEventListener('click', (evt) => {

    evt.preventDefault();
    city = inputSearch.value;

    searchForm.reset();

    start(city, units);
  });
};

start(city);