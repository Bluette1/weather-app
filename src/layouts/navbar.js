const url = 'http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=0fc88a8e4b0bd9b97cf191933bfdcbd8';
const city = 'London';
class NavBar {
  static displayNavbar = (rootElement) => {
    const logoImg = document.createElement('i');
    logoImg.setAttribute('class', 'fa fa-sun-o fa-lg pr-1 logo-img')
    logoImg.setAttribute('aria-hidden', 'true');
    const title = document.createElement('a');
    title.href = '/';
    title.textContent = 'AccurateWeather';
    title.setAttribute('class', 'navbar-brand');
    const displayWeather = '';

    const displayWeatherInfo = document.createElement('span');

    const leftNavbar = document.createElement('div');
    const toggleBtn = document.createElement('button');

    toggleBtn.setAttribute('class', 'navbar-toggler');
    toggleBtn.type = 'button';
    toggleBtn.setAttribute('data-toggle', 'collapse');
    toggleBtn.setAttribute('data-target', '#navbarSupportedContent');
    const toggleIcon = document.createElement('span');
    toggleIcon.setAttribute('class', 'navbar-toggler-icon');
    toggleBtn.appendChild(toggleIcon);

    const searchForm = document.createElement('form');
    searchForm.setAttribute('class', 'form-inline my-5 my-lg-0');
    const inputSearch = document.createElement('input');
    const searchIcon = document.createElement('i');
    searchIcon.setAttribute('class', 'fa fa-search search-icon');
    searchIcon.setAttribute('aria-hidden', 'true');
    inputSearch.setAttribute('class', 'form-control mr-sm-2');
    inputSearch.setAttribute('type', 'search');
    inputSearch.setAttribute('placeholder', 'Search city...');
    inputSearch.setAttribute('aria-label', 'Search');

    searchForm.appendChild(inputSearch);
    const searchBtn = document.createElement('button');
    searchBtn.setAttribute('class', 'btn btn-outline-success my-2 my-sm-0 search-btn');
    searchBtn.type = 'submit';
    searchBtn.appendChild(searchIcon);
    searchForm.appendChild(searchBtn);


    const collapseNavbar = document.createElement('div');
    collapseNavbar.setAttribute('class', 'collapse navbar-collapse d-md-flex flex-md-row justify-content-end');
    collapseNavbar.setAttribute('id', 'navbarSupportedContent');

    const navBar = document.createElement('nav');
    navBar.setAttribute('class', 'navbar fixed-top navbar-expand-md nav-menu navbar-dark bg-dark');
    leftNavbar.appendChild(logoImg);
    leftNavbar.appendChild(title);

    navBar.appendChild(leftNavbar);
    navBar.appendChild(toggleBtn);
    collapseNavbar.appendChild(searchForm);
    navBar.appendChild(collapseNavbar);

    const displayCity = document.createElement('div');
    displayCity.setAttribute('class', 'pl-3 mt-n4 mt-sm-0')
    displayData(displayCity, navBar);

    navBar.insertBefore(displayCity, navBar.nextSibling);
    rootElement.append(navBar);
  }
}
async function displayData(displayCity, navNode) {

  const response = await fetch(url, { mode: 'cors' });
  const data = await response.json();

  const displayWeather = `${city}, ${data['sys']['country']}, ${data['main']['temp']} °F`;

  const displayWeatherInfo = document.createTextNode(displayWeather);

  const weatherIcon = document.createElement('img');
  weatherIcon.src = 'http://openweathermap.org/img/wn/10d.png';
  displayCity.append(displayWeatherInfo, weatherIcon);

}

export default NavBar;