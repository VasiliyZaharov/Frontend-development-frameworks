import React from 'react';
import '../styles/weather-app.css';

const CitySelect = ({ handleCityChange }) => {
  const cities = ['New York', 'London', 'Tokyo', 'Ekaterinburg'];

  return (
    <div>
      <h2>Select City</h2>
      <select onChange={handleCityChange}>
        <option value="">-- Select a city --</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CitySelect;



