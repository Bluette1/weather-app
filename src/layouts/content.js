const url = 'http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=0fc88a8e4b0bd9b97cf191933bfdcbd8';

const displayContent = (rootElement) => {
  const mainContent = document.createElement('div');
  mainContent.setAttribute('class', 'card centered-content pt-5 col-md-6 col-12');
  const weatherDescription = document.createElement('div');
  weatherDescription.setAttribute('class', 'card weather-description');
  const currWeather = document.createElement('h5');
  currWeather.textContent = 'Current Weather';
  currWeather.className = 'text-uppercase p-1';
  weatherDescription.appendChild(currWeather);
  const currTime = document.createElement('p');

  displayData(currTime, weatherDescription, 'dt');
  const weatherDetails = document.createElement('div');
  weatherDetails.setAttribute('class', 'card weather-details');
  weatherDetails.textContent = 'Weather details';

  mainContent.append(weatherDescription);
  mainContent.append(weatherDetails);
  rootElement.append(mainContent);


}
async function displayData(currNode, parentElement, value) {

  const response = await fetch(url, { mode: 'cors' });
  const data = await response.json();

  currNode.textContent = `${data[value]}`;
  parentElement.appendChild(currNode);

}

export default displayContent;