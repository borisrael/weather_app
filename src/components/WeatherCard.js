import React, { useState } from 'react';

const WeatherCard = ({ weatherData, forecastData }) => {
  const [isCelsius, setIsCelsius] = useState(true);

  if (!weatherData) return null;

  const {
    name,
    main: { temp, humidity, feels_like },
    weather,
    wind: { speed },
  } = weatherData;

  const toC = (kelvin) => (kelvin - 273.15).toFixed(1);
  const toF = (kelvin) => ((kelvin - 273.15) * 9/5 + 32).toFixed(1);

  const displayTemp = (kelvin) => isCelsius ? `${toC(kelvin)}°C` : `${toF(kelvin)}°F`;
  const displayForecastTemp = (celsius) => isCelsius
    ? `${celsius}°C`
    : `${((parseFloat(celsius) * 9/5) + 32).toFixed(1)}°F`;

  const getDayName = (dateString) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const date = new Date(dateString);
    return days[date.getDay()];
  };

  return (
    <div className="weather-card">
      <div className="weather-card-main">

        {/* ── Left: Current Weather ── */}
        <div className="weather-left">
          <div className="weather-left-header">
            <h2>{name}</h2>
            <button
              className="unit-toggle"
              onClick={() => setIsCelsius(!isCelsius)}
            >
              Switch to {isCelsius ? '°F' : '°C'}
            </button>
          </div>
          <div className="weather-icon">
            <img
              src={`http://openweathermap.org/img/w/${weather[0].icon}.png`}
              alt={weather[0].description}
            />
            <p>{weather[0].description}</p>
          </div>
          <div className="weather-info">
            <p>Temperature: {displayTemp(temp)}</p>
            <p>Feels like: {displayTemp(feels_like)}</p>
            <p>Humidity: {humidity}%</p>
            <p>Wind Speed: {speed} m/s</p>
          </div>
        </div>

        {/* ── Right: 5-Day Forecast ── */}
        {forecastData && (
          <div className="weather-right">
            <h3>5-Day Forecast</h3>
            <div className="forecast-list">
              {forecastData.map((day, index) => (
                <div key={index} className="forecast-card">
                  <p className="forecast-day">{getDayName(day.date)}</p>
                  <img
                    src={`http://openweathermap.org/img/w/${day.icon}.png`}
                    alt={day.description}
                  />
                  <p className="forecast-temp">{displayForecastTemp(day.temp)}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default WeatherCard;