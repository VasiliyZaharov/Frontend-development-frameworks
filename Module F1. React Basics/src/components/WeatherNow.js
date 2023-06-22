import React from 'react';

const WeatherNow = ({ weatherData }) => {
  // Извлечение данных о погоде на текущий день из weatherData
  const currentWeather = weatherData.current;

  return (
    <div>
      <h2>Weather Now</h2>
      {currentWeather && (
        <div>
          <p>Temperature: {currentWeather.temp}°C</p>
          <p>Weather Description: {currentWeather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherNow;
