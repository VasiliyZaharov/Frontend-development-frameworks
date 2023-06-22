import React from 'react';

const WeatherNextDays = ({ weatherData }) => {
  // Извлечение данных о погоде на ближайшие пять дней из weatherData
  const nextDaysWeather = weatherData.daily.slice(1, 6);

  return (
    <div>
      <h2>Weather Next 5 Days</h2>
      {nextDaysWeather.map((dayWeather) => (
        <div key={dayWeather.dt}>
          <p>Date: {new Date(dayWeather.dt * 1000).toLocaleDateString()}</p>
          <p>Temperature: {dayWeather.temp.day}°C</p>
          <p>Weather Description: {dayWeather.weather[0].description}</p>
        </div>
      ))}
    </div>
  );
};

export default WeatherNextDays;

