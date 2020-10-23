import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/index.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import NavBar from './layouts/navbar';
import displayContent from './layouts/content';

const API_KEY = process.env.APIKEY;

const defaultCity = 'London';
let city = defaultCity;
const url = 'http://api.openweathermap.org/data/2.5/weather?';

const rootElement = document.querySelector('#root');
NavBar.displayNavbar(rootElement, `${url}q=${city}&appid=${API_KEY}&units=metric`, city);
const searchBtn = document.querySelector('#search-btn');

displayContent(rootElement, `${url}q=${city}&appid=${API_KEY}&units=metric`);

searchBtn.addEventListener('submit', () => {

});