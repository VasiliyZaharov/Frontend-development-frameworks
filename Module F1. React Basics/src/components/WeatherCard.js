import React, { useState } from 'react';
import CitySelect from './CitySelect';
import PeriodSelect from './PeriodSelect';
import WeatherData from './WeatherData';
import WeatherNow from './WeatherNow';
import WeatherNextDays from './WeatherNextDays';

const WeatherCard = () => {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('');

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handlePeriodChange = (event) => {
    setSelectedPeriod(event.target.value);
  };

  return (
    <div>
      <h1>Weather App</h1>
      <CitySelect handleCityChange={handleCityChange} />
      <PeriodSelect handlePeriodChange={handlePeriodChange} />
      <WeatherData selectedCity={selectedCity} selectedPeriod={selectedPeriod}>
        {(weatherData) => {
          if (selectedPeriod === 'Now') {
            return <WeatherNow weatherData={weatherData} />;
          } else if (selectedPeriod === 'Next 5 days') {
            return <WeatherNextDays weatherData={weatherData} />;
          } else {
            return null;
          }
        }}
      </WeatherData>
    </div>
  );
};

export default WeatherCard;


