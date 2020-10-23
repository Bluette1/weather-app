const url = 'http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=0fc88a8e4b0bd9b97cf191933bfdcbd8&units=metric';
const moment = require('moment');

const displayContent = (rootElement) => {
  const mainContent = document.createElement('div');
  mainContent.setAttribute('class', 'card centered-content py-5 col-md-6 col-12');
  const weatherDescription = document.createElement('div');
  weatherDescription.setAttribute('class', 'card pr-3 mr-2 weather-description');
  const currWeather = document.createElement('h5');
  currWeather.textContent = 'Current Weather';
  currWeather.className = 'text-uppercase p-3 font-weight-bold';
  weatherDescription.appendChild(currWeather);
  const currTime = document.createElement('p');
  currTime.className = 'p-3';
  const temperature = document.createElement('div');
  temperature.setAttribute('class', 'd-sm-flex justify-content-sm-between');

  const currTemp = document.createElement('div');
  currTemp.setAttribute('class', 'p-3 temp')
  const temp = document.createElement('span');
  temp.setAttribute('class', 'h2 font-weight-bold')
  const tempUnits = document.createElement('span');
  tempUnits.textContent = '°C';
  displayData(currTime, weatherDescription, 'timezone', undefined);

  appendUnitsAfterTemp(temp, currTemp, temperature, tempUnits, weatherDescription);

  const weatherDetails = document.createElement('div');
  weatherDetails.setAttribute('class', 'card ml-2 weather-details');
  weatherDetails.textContent = 'More details: ';

  mainContent.append(weatherDescription);
  mainContent.append(weatherDetails);
  rootElement.append(mainContent);

}
async function displayData(currNode, parentElement, valueOne, valueTwo = undefined, image = true) {

  const response = await fetch(url, { mode: 'cors' });
  const data = await response.json();
  if (!valueTwo) {
    if (valueOne === 'timezone') {
      currNode.textContent = `${toDateUTCTime(data[valueOne])}`;
    }
  } else {
    currNode.textContent = `${data[valueOne][valueTwo]}`;
  }

  const weatherDescripn = document.createElement('div');
  weatherDescripn.setAttribute('class', 'p-2 d-sm-flex justify-content-sm-between')

  parentElement.append(currNode);
  if (image === true) {
    const weatherIcon = document.createElement('img');
    weatherIcon.className = 'weather-icon-description';
    weatherIcon.src = `http://openweathermap.org/img/wn/${data['weather'][0]['icon']}.png`;
    const description = document.createElement('h5');
    description.textContent = `${data['weather'][0]['description']}`;
    const mainDescription = document.createElement('h5');
    mainDescription.className = 'font-weight-bold text-uppercase pr-1';
    mainDescription.textContent = `${data['weather'][0]['main']}:`;
    weatherDescripn.appendChild(weatherIcon);
    weatherDescripn.appendChild(mainDescription);
    weatherDescripn.appendChild(description);
    parentElement.append(weatherDescripn);
  }

}

const toDateUTCTime = (secs) => {
  return moment().utcOffset(secs / 60);
}

const appendUnitsAfterTemp = (temp, currTemp, temperature, tempUnits, weatherDescription) => {

  displayData(temp, currTemp, 'main', 'temp', false).then(function() {
    temperature.append(currTemp);

    temp.after(tempUnits);
  }).then(function() {
    const feelsLike = document.createElement('div');
    feelsLike.setAttribute('class', 'feels-like');

    const feelsLikeText = document.createElement('span');
    feelsLikeText.textContent = 'RealFeel';
    const feelsLikeIcon = document.createElement('i');
    feelsLikeIcon.className = 'fa fa-registered pr-1';
    feelsLike.append(feelsLikeText);
    feelsLike.append(feelsLikeIcon);
    const feelsLikeTemp = document.createElement('span');
    displayData(feelsLikeTemp, feelsLike, 'main', 'feels_like', false).then(function() {
      const feelsLikeDegrees = document.createElement('span');
      feelsLikeDegrees.textContent = '°';
      feelsLikeTemp.after(feelsLikeDegrees);
      temperature.append(feelsLike);
      weatherDescription.append(temperature);
    });
  });
};

export default displayContent;