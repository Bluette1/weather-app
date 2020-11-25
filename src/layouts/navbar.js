const unitsMap = {
  metric: '°C',
  imperial: '°F',
};
const displayData = (displayCity, data, units) => {
  const displayWeather = `${data.name}, ${data.sys.country}, ${data.main.temp}${unitsMap[units]}`;

  const displayWeatherInfo = document.createElement('span');
  displayWeatherInfo.textContent = displayWeather;
  displayWeatherInfo.setAttribute('id', 'weather-info');

  const weatherIcon = document.createElement('img');
  weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
  displayCity.append(displayWeatherInfo, weatherIcon);
};

class NavBar {
  static displayNavbar = (rootElement, data, units) => {
    const logoImg = document.createElement('i');
    logoImg.setAttribute('class', 'fa fa-sun-o fa-lg pr-1 logo-img');
    logoImg.setAttribute('aria-hidden', 'true');
    const title = document.createElement('a');
    title.href = '/';
    title.textContent = 'AccurateWeather';
    title.setAttribute('class', 'navbar-brand');

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
    searchForm.setAttribute('id', 'search-form');
    const inputSearch = document.createElement('input');
    const searchIcon = document.createElement('i');
    searchIcon.setAttribute('class', 'fa fa-search search-icon');
    searchIcon.setAttribute('aria-hidden', 'true');
    inputSearch.setAttribute('class', 'form-control mr-sm-2');
    inputSearch.setAttribute('type', 'search');
    inputSearch.setAttribute('placeholder', 'Search city...');
    inputSearch.setAttribute('aria-label', 'Search');
    inputSearch.setAttribute('id', 'input-search');

    searchForm.appendChild(inputSearch);
    const searchBtn = document.createElement('button');
    searchBtn.setAttribute('class', 'btn btn-outline-success my-2 my-sm-0 search-btn');
    searchBtn.type = 'submit';
    const search = document.createElement('button');
    search.setAttribute('type', 'submit');
    search.textContent = 'search';

    searchBtn.appendChild(searchIcon);
    searchBtn.setAttribute('id', 'search-btn');
    searchForm.appendChild(searchBtn);

    const collapseNavbar = document.createElement('div');
    collapseNavbar.setAttribute('class', 'collapse navbar-collapse d-md-flex flex-md-row justify-content-end mt-n4 mt-md-0');
    collapseNavbar.setAttribute('id', 'navbarSupportedContent');

    const navBar = document.createElement('nav');
    navBar.setAttribute('class', 'navbar fixed-top navbar-expand-md nav-menu navbar-dark bg-primary');
    leftNavbar.appendChild(logoImg);
    leftNavbar.appendChild(title);

    navBar.appendChild(leftNavbar);
    navBar.appendChild(toggleBtn);
    collapseNavbar.appendChild(searchForm);
    navBar.appendChild(collapseNavbar);

    const displayCity = document.createElement('div');
    displayCity.setAttribute('class', 'pl-3 mt-n4 mt-sm-0');
    displayData(displayCity, data, units);

    navBar.insertBefore(displayCity, navBar.nextSibling);
    rootElement.append(navBar);
  }

  static toggleUnits = (data, displayWeatherInfo, units) => {
    displayWeatherInfo.textContent = `${data.name}, ${data.sys.country}, ${data.main.temp}${unitsMap[units]}`;
  }
}

export default NavBar;