import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/index.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import NavBar from './layouts/navbar';
import displayContent from './layouts/content';

const API_KEY = process.env.APIKEY;

const defaultCity = 'London';
const city = defaultCity;
const url = 'https://api.openweathermap.org/data/2.5/weather?';

const start = (city, units = 'metric') => {
  const rootElement = document.querySelector('#root');
  rootElement.innerHTML = '';

  const urlPath = `${url}q=${city}&appid=${API_KEY}&units=${units}`;
  NavBar.displayNavbar(rootElement, urlPath);
  displayContent(rootElement, urlPath);
  const searchBtn = document.querySelector('#search-btn');
  const inputSearch = document.querySelector('#input-search');
  const searchForm = document.querySelector('#search-form');
  const farenheight = document.querySelector('#farenheight');
  if (farenheight.checked === true) {
    units = 'imperial';
    start(city, units);
  }
  searchBtn.addEventListener('click', (evt) => {
    evt.preventDefault();
    city = inputSearch.value;

    searchForm.reset();

    start(city, units);
  });
};

start(city);