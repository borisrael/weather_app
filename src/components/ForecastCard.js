import React from 'react';

const ForecastCard = ({ forecast }) => {
  const getDayName = (dateString) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const date = new Date(dateString);
    return days[date.getDay()];
  };

  return (
    <div className="forecast-container">
      <h3>5-Day Forecast</h3>
      <div className="forecast-list">
        {forecast.map((day, index) => (
          <div key={index} className="forecast-card">
            <p className="forecast-day">{getDayName(day.date)}</p>
            <img
              src={`http://openweathermap.org/img/w/${day.icon}.png`}
              alt={day.description}
            />
            <p className="forecast-temp">{day.temp}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastCard;