const url = 'https://api.openweathermap.org/data/2.5/weather?';
async function fetchWeatherInfo() {
  const urlMetricPath = `${url}&units=${metric}`;
  const urlImperialPath = `${url}&units=${imperial}`;
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
const weatherInfo = (callback) => fetchWeatherInfo()
  .then(weatherData => callback(null, weatherData))
  .catch(error => callback(error));

export default weatherInfo;

// weatherInfo((error, data) => {
//   if (error) {} else {
//     console.log(JSON.stringify(data));
//   }
// });

// import weatherInfo from './helpers/proxyHelper';