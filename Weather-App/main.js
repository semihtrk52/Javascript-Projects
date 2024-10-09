const searchedCity = document.getElementById('cityName');
const description = document.getElementById('description');
const image = document.getElementById('image');
const degree = document.getElementById('degree');
const feelsLike = document.getElementById('details-degree');
const winds = document.getElementById('winds');
const humidity = document.getElementById('humidity');
const pressure = document.getElementById('pressure');
const weekWeatherDiv = document.querySelector('.days');
const weekWeatherDiv1 = document.querySelector('.day');
const weatherDiv = document.querySelector('.weather');

const getCoordinates = (cityname) => {
  const apiKey = '9471f5fe1cbc9763a5eb2573068538b3';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apiKey}&units=metric`;

  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      return {
        lat: data.coord.lat,
        lon: data.coord.lon,
        name: data.name,
        country: data.sys.country,
        weather: data.weather[0],
        icon: data.weather[0].icon,
        main: data.main,
        wind: data.wind,
      };
    });
};

const getWeeklyData = (lat, lon) => {
  const apiKey = '9471f5fe1cbc9763a5eb2573068538b3';
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    });
};

document
  .getElementById('cityInput')
  .addEventListener('keypress', async (event) => {
    if (event.key === 'Enter') {
      const city = document.getElementById('cityInput').value;

      weatherDiv.classList.remove('hidden');
      weekWeatherDiv1.classList.remove('hidden');

      try {
        const coordinates = await getCoordinates(city);
        console.log(coordinates);

        const weeklyData = await getWeeklyData(
          coordinates.lat,
          coordinates.lon
        );
        console.log(weeklyData);

        const weeklyWeatherData = weeklyData.list;

        const dayNames = [
          'Pazar',
          'Pazartesi',
          'Salı',
          'Çarşamba',
          'Perşembe',
          'Cuma',
          'Cumartesi',
        ];

        const indicesToFetch = [0, 8, 16, 24, 32, 39];
        const weatherByDate = {};

        indicesToFetch.forEach((index) => {
          if (index < weeklyWeatherData.length) {
            const item = weeklyWeatherData[index];
            const dateStr = item.dt_txt.split(' ')[0];
            console.log(dateStr);
            const date = new Date(dateStr);
            const dayIndex = date.getUTCDay();
            console.log(item);

            weatherByDate[dateStr] = {
              day: dayNames[dayIndex],
              icon: item.weather[0].icon,
              description: item.weather[0].description,
              minTemp: Math.round(item.main.temp_min),
              maxTemp: Math.round(item.main.temp_max),
            };
          }
        });

        console.log(weatherByDate);

        searchedCity.textContent = `${coordinates.name}, ${coordinates.country}`;
        description.textContent = `${coordinates.weather.description}`;
        image.src = `images/${coordinates.icon}.png`;
        degree.textContent = `${Math.round(coordinates.main.temp)}°C`;
        feelsLike.textContent = `${Math.round(coordinates.main.feels_like)}°C`;
        winds.textContent = `${coordinates.wind.speed} m/s`;
        humidity.textContent = `${coordinates.main.humidity}%`;
        pressure.textContent = `${coordinates.main.pressure} hPa`;

        weekWeatherDiv.innerHTML = '';

        for (const date in weatherByDate) {
          const weatherInfo = weatherByDate[date];

          const dayInfoDiv = document.createElement('div');
          dayInfoDiv.classList.add('days-info');

          const daysLeftDiv = document.createElement('div');
          daysLeftDiv.classList.add('days-left');

          const weatherImage = document.createElement('img');
          weatherImage.src = `images/${weatherInfo.icon}.png`;
          daysLeftDiv.appendChild(weatherImage);

          const daySpan = document.createElement('span');
          daySpan.textContent = weatherInfo.day;
          daysLeftDiv.appendChild(daySpan);

          dayInfoDiv.appendChild(daysLeftDiv);

          const daysRightDiv = document.createElement('div');
          daysRightDiv.classList.add('days-right');

          const descriptionSpan = document.createElement('span');
          descriptionSpan.textContent = weatherInfo.description;
          daysRightDiv.appendChild(descriptionSpan);

          const tempSpan = document.createElement('span');
          tempSpan.innerHTML = `${weatherInfo.minTemp}&deg;C/${weatherInfo.maxTemp}&deg;C`;
          daysRightDiv.appendChild(tempSpan);

          dayInfoDiv.appendChild(daysRightDiv);

          weekWeatherDiv.appendChild(dayInfoDiv);
        }
      } catch (error) {
        console.error('Hata:', error.message);
      }
    }
  });
