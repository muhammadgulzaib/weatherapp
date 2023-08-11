// WeatherCard.js
import React, { useState } from 'react';
import './styles.css';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';

const WeatherCard = ({ weatherData, cityCoords, weeklyForecast }) => {
  const { name, main, weather } = weatherData;

  const mapContainerStyle = {
    width: '100%',
    height: '300px',
  };

  const [isCelsius, setIsCelsius] = useState(true);

  const toggleTemperatureUnit = () => {
    setIsCelsius(!isCelsius);
  };

  const convertTemperature = (celsius) => {
    return isCelsius ? celsius : (celsius * 9) / 5 + 32;
  };

  return (
    <div className="weather-card">
      <h2>{name}</h2>
      <p>
        Temperature: {convertTemperature(main.temp).toFixed(2)}
        {isCelsius ? '°C' : '°F'}
      </p>
      <button onClick={toggleTemperatureUnit}>
        Convert to {isCelsius ? 'Fahrenheit' : 'Celsius'}
      </button>
      <p>Weather: {weather[0].description}</p>
      <img
        src={`http://openweathermap.org/img/w/${weather[0].icon}.png`}
        alt={weather[0].description}
      />
      <LoadScript  googleMapsApiKey="AIzaSyDFX_BFcUUKcyC5tJAbI-VtVXKVfzKBRus">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={cityCoords}
          zoom={10}
        >
          <Marker position={cityCoords} />
        </GoogleMap>
      </LoadScript>
      <div className="weekly-forecast">
        <h3>Weekly Forecast</h3>
        <ul>
          {weeklyForecast.map((day, index) => (
            <li key={index}>
              <strong>{day.date}</strong>:{' '}
              {convertTemperature(day.temp).toFixed(2)}
              {isCelsius ? '°C' : '°F'}, {day.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WeatherCard;


     