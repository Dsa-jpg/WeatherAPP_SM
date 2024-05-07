import React from "react";
import "./WeatherDisplay.css";
import { faSun, faCloud, faCloudShowersHeavy, faBolt, faSnowflake, faSmog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTint, faCompass, faWind, faMoon } from '@fortawesome/free-solid-svg-icons';

const WeatherDisplay = ({ weather, forecast }) => {

  // Funkce pro seskupení předpovědi počasí podle data (den)
  const groupForecastByDay = (forecastData) => {
    const groupedForecast = {}; // Objekt pro uchování předpovědi počasí seskupené podle data
    forecastData.forEach((item) => { // Procházení dat předpovědi počasí
      const date = item.dt_txt.split(" ")[0]; // Získání data (bez času)
      if (!groupedForecast[date]) { // Pokud pro dané datum neexistuje pole, vytvoří se
        groupedForecast[date] = []; // Vytvoření pole pro dané datum
      }
      groupedForecast[date].push(item); // Přidání dat do pole
    });
    return groupedForecast; // Vrácení seskupených dat
  };


  // Funkce pro zobrazení icony podle popisu z API 
  const getWeatherIcon = (weatherType) => {
    switch (weatherType) {
      case "clear sky":
      case "clear":
        return <FontAwesomeIcon icon={faSun} style={{ color: "#fdd835" }} />;
      case "few clouds":
      case "scattered clouds":
      case "overcast clouds":
      case "broken clouds":
        return <FontAwesomeIcon icon={faCloud} style={{ color: "#90a4ae"  }} />;
      case "shower rain":
      case "rain":
      case "light rain":
        return <FontAwesomeIcon icon={faCloudShowersHeavy} style={{ color: "#1565c0" }} />;
      case "thunderstorm":
        return <FontAwesomeIcon icon={faBolt} style={{ color: "#ffeb3b" }} />;
      case "snow":
        return <FontAwesomeIcon icon={faSnowflake} style={{ color: "#ffffff" }} />;
      case "mist":
      case "light intensity drizzle":
        return <FontAwesomeIcon icon={faSmog} style={{ color: "#78909c" }} />;
      default:
        return null;
    }
  };

  return (
    <div>
      {weather && (
        <div className="current-weather">
          <div className="weather-info">
            <div className="city-date">
              <h2>{weather.City}, {weather.Country}, {weather.Date}</h2>
            </div>
            <div className="details-container">
              <div className="temperature">
                <h3>{weather.Temperature.toFixed(1)}°C </h3>
                  <div className="description">
                    {getWeatherIcon(weather.Description)}
                  </div>
              </div>
              <div className="other-details">
              <p><FontAwesomeIcon icon={faTint} /> Humidity: {weather.Humidity}%</p>
              <p><FontAwesomeIcon icon={faCompass} /> Pressure: {weather.Pressure}hPa</p>
              <p><FontAwesomeIcon icon={faWind} /> Wind Speed: {weather.WindSpeed}m/s</p>
              <p><FontAwesomeIcon icon={faSun} /> Sunrise: {weather.SunRise} CEST</p>
              <p><FontAwesomeIcon icon={faMoon} /> Sunset: {weather.SunSet} CEST</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {forecast && (
          <div>
            <h2>Weather Forecast</h2>
            <div className="forecast-by-day">

            {/* Funkce Object.entries konvertuje objekt na pole, které obsahuje pole [klíč, hodnota] pro každý pár klíč-hodnota v objektu. 
          Tento krok je použit k iteraci přes všechny dny v předpovědi počasí a jejich příslušné předpovědi. */}


              {Object.entries(groupForecastByDay(forecast)).map(([date, data], index) => (
                <div className="forecast-day" key={index}>
                  <h3>{date}</h3>
                  <div className="forecast-items">

                  {/* Pro každý den vytvoříme seznam s předpovědí počasí.*/}

                    {data.map((item, itemIndex) => (
                      <div className="forecast-item" key={itemIndex}>
                        <p>{item.dt_txt.split(" ")[1]}</p>
                        <p>{(item.main.temp - 273.15).toFixed(1)}°C</p>
                        {getWeatherIcon(item.weather[0].description)}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
    </div>
  );
};

export default WeatherDisplay;
