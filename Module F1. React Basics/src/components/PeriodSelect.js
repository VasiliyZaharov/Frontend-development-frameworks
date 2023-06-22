import React from 'react';
import '../styles/weather-app.css';

const PeriodSelect = ({ handlePeriodChange }) => {
  const periods = ['Now', 'Next 5 days'];

  return (
    <div>
      <h2>Select Period</h2>
      <select onChange={handlePeriodChange}>
        <option value="">-- Select a period --</option>
        {periods.map((period) => (
          <option key={period} value={period}>
            {period}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PeriodSelect;


