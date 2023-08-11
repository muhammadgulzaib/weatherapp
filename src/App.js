import React, { useState } from 'react';
import './App.css';
import WeatherForm from './components/WeatherForm';
import WeatherCard from './components/WeatherCard';

// const API_KEY = '861c7782dfb637a668f3969b64fc1a9d';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [cityCoords, setCityCoords] = useState({ lat: 0, lng: 0 });
  const [weeklyForecast, setWeeklyForecast] = useState([]);

  const getWeather = async (city) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=861c7782dfb637a668f3969b64fc1a9d`
    );
    const data = await response.json();
    setWeatherData(data);
    setCityCoords({ lat: data.coord.lat, lng: data.coord.lon });

    // Fetch weekly forecast data
    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=861c7782dfb637a668f3969b64fc1a9d`
    );
    const forecastData = await forecastResponse.json();
    const dailyForecast = forecastData.list.filter((entry) =>
      entry.dt_txt.includes('12:00:00')
    );

    const weeklyForecastData = dailyForecast.map((entry) => ({
      date: entry.dt_txt.split(' ')[0],
      temp: entry.main.temp,
      description: entry.weather[0].description,
    }));

    setWeeklyForecast(weeklyForecastData);
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <WeatherForm getWeather={getWeather} />
      {weatherData && (
        <WeatherCard
          weatherData={weatherData}
          cityCoords={cityCoords}
          weeklyForecast={weeklyForecast}
        />
      )}
    </div>
  );
}

export default App;