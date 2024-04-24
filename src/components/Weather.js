// src/components/Weather.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Weather.css'; // Import CSS file

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [unit, setUnit] = useState('metric'); // Default unit is Celsius (metric)
  const [city, setCity] = useState(''); // State variable to store city name
  const [error, setError] = useState(null); // State variable to store error message

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=b9a0e6b954edd12e9a8040eb4d575a5b`
        );
        setWeatherData(response.data);
        setError(null); // Reset error state if request succeeds
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setWeatherData(null); // Reset weatherData state to null in case of error
        setError('Failed to fetch weather data. Please try again later.'); // Set error message
      }
    };

    fetchWeatherData();
  }, [city, unit]); // Trigger useEffect when city or unit changes

  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
  };

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Fetch weather data for the entered city when form is submitted
    // The useEffect hook will automatically trigger with the updated city name
  };

  return (
    <div className="weather-container">
      <form className="form-container" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleInputChange}
        />
        <button type="submit">Search</button>
      </form>
      {error && <p className="error">{error}</p>}
      {weatherData ? (
        <div className="weather-info">
          <h2>Weather in {weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp}°{unit === 'metric' ? 'C' : 'F'}</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          <p>Weather: {weatherData.weather[0].description}</p>
          <img
            className="weather-icon"
            src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
            alt="Weather Icon"
          />
        </div>
      ) : (
        <p className="loading">Loading...</p>
      )}
      <button className="switch-button" onClick={toggleUnit}>
        {unit === 'metric' ? 'Switch to Fahrenheit' : 'Switch to Celsius'}
      </button>
    </div>
  );
};

export default Weather;
