import React, { useState } from 'react';
import WeatherCard from './components/WeatherCard';
import './styles/weather-app.css';

const App = () => {
  const [city, setCity] = useState('');

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Selected city:', city);
  };

  return (
    <div className="container">
      <WeatherCard city={city} />
    </div>
  );
};

export default App;
