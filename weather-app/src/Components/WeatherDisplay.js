import React from "react";

const WeatherDisplay = ({ weather }) => {
  return (
    <div>
      {weather && (
        <div>
          <h2>{weather.City}, {weather.Country}, {weather.Date}</h2>
          <h3>{weather.Temperature.toFixed(2)}°C</h3>
          <p>{weather.Description}</p>
          <p>Humidity: {weather.Humidity}%</p>
          <p>Pressure: {weather.Pressure}hPa</p>
          <p>Wind Speed: {weather.WindSpeed}m/s</p>
          <p>Sunrise: {weather.SunRise} CEST</p>
          <p>Sunset: {weather.SunSet} CEST</p>
        </div>
      )}
    </div>
  );
};

export default WeatherDisplay;
