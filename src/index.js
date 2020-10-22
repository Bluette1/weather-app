import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/index.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import NavBar from './layouts/navbar';
import displayContent from './layouts/content';


const rootElement = document.querySelector('#root');
NavBar.displayNavbar(rootElement);

displayContent(rootElement);