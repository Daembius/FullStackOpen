import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState(null);
  // Important: for the API key, see the README file
  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  useEffect(() => {
    if (capital && API_KEY) {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${API_KEY}&units=metric`)
        .then(response => {
          setWeather(response.data);
        })
        .catch(error => {
          console.error('Error fetching weather data:', error);
        });
    }
  }, [capital, API_KEY]);

  if (!weather) return null;

  return (
    <div>
      <h3>Weather in {capital}</h3>
      <p>Temperature: {weather.main.temp}°C</p>
      <img 
        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
        alt={weather.weather[0].description}
      />
      <p>Wind: {weather.wind.speed} m/s</p>
    </div>
  );
};

export default Weather;