const moment = require('moment');

const unitsMap = {
  metric: '°C',
  imperial: '°F',
};

const toggleUnits = (temp, tempUnits, feelsLike, data, units) => {
  temp.textContent = data.main.temp;
  tempUnits.textContent = unitsMap[units];
  feelsLike.textContent = data.main.feels_like;
};
const ulDetails = document.createElement('ul');
const toDateUTCTime = (secs) => moment().utcOffset(secs / 60);
const secsUTCToDate = (secs, offset = '+0000') => moment.unix(secs).utcOffset(offset);

function displayData(
  data, currNode, parentElement, valueOne, valueTwo = undefined, image = true,

) {
  if (!valueTwo) {
    if (valueOne === 'timezone') {
      currNode.textContent = `${toDateUTCTime(data[valueOne]).format('LLLL')}`;
    }
  } else {
    currNode.textContent = `${data[valueOne][valueTwo]}`;
    if (valueTwo === 'sunrise' || valueTwo === 'sunset') {
      const offset = toDateUTCTime(data.timezone).utcOffset();
      currNode.textContent = `${secsUTCToDate(data[valueOne][valueTwo], offset).format('LLLL')}`;
    }
  }

  const weatherDescripn = document.createElement('div');
  weatherDescripn.setAttribute('class', 'p-2 d-sm-flex justify-content-sm-between');

  parentElement.append(currNode);
  if (image === true) {
    const weatherIcon = document.createElement('img');
    weatherIcon.className = 'weather-icon-description';
    weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    const description = document.createElement('h5');
    description.textContent = `${data.weather[0].description}`;
    const mainDescription = document.createElement('h5');
    mainDescription.className = 'font-weight-bold text-uppercase pr-1';
    mainDescription.textContent = `${data.weather[0].main}:`;
    weatherDescripn.appendChild(weatherIcon);
    weatherDescripn.appendChild(mainDescription);
    weatherDescripn.appendChild(description);
    parentElement.append(weatherDescripn);
  }
}

const displayTemperature = (data, temp, currTemp, temperature, tempUnits, weatherDescription) => {
  displayData(data, temp, currTemp, 'main', 'temp', false);

  temperature.append(currTemp);

  temp.after(tempUnits);

  const feelsLike = document.createElement('div');
  feelsLike.setAttribute('class', 'feels-like');

  const feelsLikeText = document.createElement('span');
  feelsLikeText.textContent = 'RealFeel';
  const feelsLikeIcon = document.createElement('i');
  feelsLikeIcon.className = 'fa fa-registered pr-1 registered-icon';
  feelsLike.append(feelsLikeText);
  feelsLike.append(feelsLikeIcon);
  const feelsLikeTemp = document.createElement('span');
  feelsLikeTemp.setAttribute('id', 'feels-like');
  displayData(data, feelsLikeTemp, feelsLike, 'main', 'feels_like', false);
  const feelsLikeDegrees = document.createElement('span');
  feelsLikeDegrees.textContent = '°';
  feelsLikeTemp.after(feelsLikeDegrees);
  temperature.append(feelsLike);
  weatherDescription.append(temperature);
};

const displayUnitsAfterMeasurement = (
  data, units, currNode, parentElement, valueOne, valueTwo = undefined,
) => {
  displayData(data, currNode, parentElement, valueOne, valueTwo, false);

  const unitsItem = document.createElement('span');
  unitsItem.textContent = units;

  currNode.after(unitsItem);
};

const displayMeasurement = (data, text, units, valueOne, valueTwo) => {
  const li = document.createElement('li');
  li.className = 'list-group-item';
  const liText = document.createElement('span');
  liText.textContent = text;
  li.append(liText);
  const itemMetrics = document.createElement('span');

  displayUnitsAfterMeasurement(data, units, itemMetrics, li, valueOne, valueTwo, false);
  ulDetails.append(li);
};

const displayContent = (rootElement, data, units) => {
  const tempToggle = document.createElement('div');
  tempToggle.setAttribute('class', 'btn-group btn-group-toggle mt-5 mt-sm-n5 temp-toggle');
  tempToggle.setAttribute('data-toggle', 'buttons');
  const celsiusLabel = document.createElement('label');
  celsiusLabel.setAttribute('class', 'btn btn-primary');
  celsiusLabel.textContent = '°C';
  const farenheightLabel = document.createElement('label');
  farenheightLabel.setAttribute('class', 'btn btn-primary');
  farenheightLabel.textContent = '°F';
  const radioCelsius = document.createElement('input');
  radioCelsius.setAttribute('type', 'radio');
  radioCelsius.setAttribute('name', 'options');
  radioCelsius.setAttribute('autocomplete', 'off');
  radioCelsius.setAttribute('id', 'celsius');

  const radioFarenheight = document.createElement('input');
  radioFarenheight.setAttribute('type', 'radio');
  radioFarenheight.setAttribute('name', 'options');
  radioFarenheight.setAttribute('autocomplete', 'off');
  radioFarenheight.setAttribute('id', 'farenheight');
  if (units === 'metric') {
    radioCelsius.checked = true;
    celsiusLabel.classList.add('active');
  } else {
    radioFarenheight.checked = true;
    farenheightLabel.classList.add('active');
  }

  celsiusLabel.append(radioCelsius);
  farenheightLabel.append(radioFarenheight);

  tempToggle.append(celsiusLabel, farenheightLabel);
  rootElement.append(tempToggle);

  const mainContent = document.createElement('div');
  mainContent.setAttribute('class', 'card centered-content py-5 col-md-9 col-lg-6 col-12');
  const weatherDescription = document.createElement('div');
  weatherDescription.setAttribute('class', 'card pr-3 mr-md-2 weather-description');
  const currWeather = document.createElement('h5');
  currWeather.textContent = 'Current Weather';
  currWeather.className = 'text-uppercase p-3 font-weight-bold';
  weatherDescription.appendChild(currWeather);
  const currTime = document.createElement('p');
  currTime.className = 'p-3';
  const temperature = document.createElement('div');
  temperature.setAttribute('class', 'd-sm-flex justify-content-sm-between');

  const currTemp = document.createElement('div');
  currTemp.setAttribute('class', 'p-3 temp');
  const temp = document.createElement('span');
  temp.setAttribute('class', 'h2 font-weight-bold');
  temp.setAttribute('id', 'temp');
  const tempUnits = document.createElement('span');
  tempUnits.textContent = unitsMap[units];
  tempUnits.setAttribute('id', 'temp-units');
  displayData(data, currTime, weatherDescription, 'timezone', undefined);

  displayTemperature(data, temp, currTemp, temperature, tempUnits, weatherDescription);

  const weatherDetails = document.createElement('div');
  weatherDetails.setAttribute('class', 'card ml-md-2 mt-2 mt-md-0 weather-details');
  const moreDetails = document.createElement('h5');
  moreDetails.textContent = 'More details:';
  weatherDetails.append(moreDetails);
  moreDetails.className = 'card-header text-uppercase p-3 font-weight-bold';
  ulDetails.innerHTML = '';
  ulDetails.className = 'list-group list-group-flush';
  displayMeasurement(data, 'Wind speed: ', ' meter/sec', 'wind', 'speed');
  displayMeasurement(data, 'Wind direction: ', '°', 'wind', 'deg');
  displayMeasurement(data, 'Humidity: ', '%', 'main', 'humidity');
  displayMeasurement(data, 'Pressure: ', ' hPa', 'main', 'pressure');
  displayMeasurement(data, 'Cloudiness: ', '%', 'clouds', 'all');
  displayMeasurement(data, 'Sunrise: ', '', 'sys', 'sunrise');
  displayMeasurement(data, 'Sunset: ', '', 'sys', 'sunset');

  mainContent.append(weatherDescription);
  weatherDetails.append(ulDetails);
  mainContent.append(weatherDetails);

  rootElement.append(mainContent);
};

export { displayContent, toggleUnits };