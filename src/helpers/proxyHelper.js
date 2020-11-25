const base_url = 'https://api.openweathermap.org/data/2.5/weather?';
const API_KEY = process.env.APIKEY;
async function fetchWeatherInfo(city) {
  const url = `${base_url}q=${city}&appid=${API_KEY}`;
  const urlMetricPath = `${url}&units=metric`;
  const urlImperialPath = `${url}&units=imperial`;
  const [metricResponse, imperialResponse] = await Promise.all([
    fetch(urlMetricPath),
    fetch(urlImperialPath)
  ]);

  const metricResults = await metricResponse.json();
  const imperialResults = await imperialResponse.json();

  return {
    metricResults,
    imperialResults
  };
}
const weatherInfo = (city, callback) => fetchWeatherInfo(city)
  .then(weatherData => callback(null, weatherData))
  .catch(error => callback(error));

export default weatherInfo;