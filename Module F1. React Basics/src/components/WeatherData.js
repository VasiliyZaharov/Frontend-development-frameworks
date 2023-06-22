import React, { useEffect, useState } from 'react';

const WeatherData = ({ selectedCity, selectedPeriod }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = "011aa5d8a3194cd7728c9237381e1f09";
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&appid=${apiKey}`);
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.log('Error fetching weather data:', error);
      }
    };

    fetchData();
  }, [selectedCity]);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  // Обработка и отображение полученных данных о погоде в соответствии с выбранным периодом
  let weatherContent;

  if (selectedPeriod === 'Now') {
    const currentWeather = weatherData.list[0]?.weather[0];
    const temperatureCelsius = weatherData.list[0]?.main.temp - 273.15;
    weatherContent = (
      <div>
        <h3>Current Weather</h3>
        <p>Description: {currentWeather?.description}</p>
        <p>Date: {new Date(weatherData.list[0]?.dt * 1000).toLocaleDateString()}</p>
        <p>Temperature: {temperatureCelsius.toFixed(2)}°C</p>
      </div>
    );
  } else if (selectedPeriod === 'Next 5 days') {
    const nextDaysWeather = weatherData.list?.slice(1, 6);
    weatherContent = (
      <div>
        <h3>Weather for the Next 5 Days</h3>
        {nextDaysWeather.map((dayWeather) => {
          const temperatureCelsius = dayWeather.main.temp - 273.15;
          return (
            <div key={dayWeather.dt}>
              <p>Date: {new Date(dayWeather.dt * 1000).toLocaleDateString()}</p>
              <p>Temperature: {temperatureCelsius.toFixed(2)}°C</p>
              <p>Description: {dayWeather.weather[0].description}</p>
            </div>
          );
        })}
      </div>
    );
  } else {
    weatherContent = null;
  }

  return (
    <div>
      <h2>Weather Data:</h2>
      {weatherContent}
    </div>
  );
};

export default WeatherData;
