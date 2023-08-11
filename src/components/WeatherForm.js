// WeatherForm.js
import React, { useState } from 'react';
import './styles.css'; // Import the CSS file

const WeatherForm = ({ getWeather }) => {
  const [searchType, setSearchType] = useState('city');
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    getWeather(searchValue, searchType);
    setSearchValue('');
  };

  return (
    <div className="weather-form">
      <form onSubmit={handleSubmit}>
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="city">City</option>
          <option value="zip">Zip Code</option>
        </select>
        <input
          type="text"
          placeholder={searchType === 'city' ? 'Enter city' : 'Enter zip code'}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button type="submit">Get Weather</button>
      </form>
    </div>
  );
};

export default WeatherForm;
