import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ThemeToggle from './components/ThemeToggle';
import './App.css';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
  const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
  const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-mode' : '';
  }, [isDarkMode]);

  // ── Geolocation: runs once on first load ──
  useEffect(() => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          await fetchWeatherByCoords(latitude, longitude);
        },
        (err) => {
          // User denied location or error occurred
          setLoading(false);
          setError('Enable location access for automatic weather, or search a city above.');
        }
      );
    }
  }, []);

  // ── Fetch by coordinates (used by geolocation) ──
  const fetchWeatherByCoords = async (lat, lon) => {
    setLoading(true);
    setError(null);

    try {
      const weatherResponse = await axios.get(BASE_URL, {
        params: { lat, lon, appid: API_KEY },
      });
      setWeatherData(weatherResponse.data);

      const forecastResponse = await axios.get(FORECAST_URL, {
        params: { lat, lon, appid: API_KEY },
      });

      const daily = forecastResponse.data.list.filter((_, index) => index % 8 === 0);
      const formatted = daily.map((item) => ({
        date: item.dt_txt,
        temp: (item.main.temp - 273.15).toFixed(1),
        icon: item.weather[0].icon,
        description: item.weather[0].description,
      }));
      setForecastData(formatted);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not fetch weather for your location.');
      setLoading(false);
    }
  };

  // ── Fetch by city name (used by search bar) ──
  const fetchWeather = async (city) => {
    setLoading(true);
    setError(null);

    try {
      const weatherResponse = await axios.get(BASE_URL, {
        params: { q: city, appid: API_KEY },
      });
      setWeatherData(weatherResponse.data);

      const forecastResponse = await axios.get(FORECAST_URL, {
        params: { q: city, appid: API_KEY },
      });

      const daily = forecastResponse.data.list.filter((_, index) => index % 8 === 0);
      const formatted = daily.map((item) => ({
        date: item.dt_txt,
        temp: (item.main.temp - 273.15).toFixed(1),
        icon: item.weather[0].icon,
        description: item.weather[0].description,
      }));
      setForecastData(formatted);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'City not found');
      setWeatherData(null);
      setForecastData(null);
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="app-header">
        <h1>Weather App</h1>
        <ThemeToggle isDarkMode={isDarkMode} onToggle={() => setIsDarkMode(!isDarkMode)} />
      </div>
      <SearchBar onSearch={fetchWeather} />

      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}
      {weatherData && <WeatherCard weatherData={weatherData} forecastData={forecastData} />}
    </div>
  );
};

export default App;