import React from "react";
import "./WeatherDisplay.css";

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

  return (
    <div>
      {weather && (
        <div className="current-weather">
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
      {forecast && (
        <div>
          <h2>Weather Forecast</h2>
          <div className="forecast-by-day">

          {/* Funkce Object.entrieskonvertuje objekt na pole, které obsahuje pole [klíč, hodnota] pro každý pár klíč-hodnota v objektu. 
          Tento krok je použit k iteraci přes všechny dny v předpovědi počasí a jejich příslušné předpovědi. */}

            {Object.entries(groupForecastByDay(forecast)).map(([date, data], index) => (
              <div className="forecast-day" key={index}>
                <h3>{date}</h3>

            {/* Pro každý den vytvoříme seznam s předpovědí počasí.*/}
            
                {data.map((item, itemIndex) => (
                  <div key={itemIndex}>
                    <p>{item.dt_txt.split(" ")[1]}: {(item.main.temp - 273.15).toFixed(2)}°C, {item.weather[0].description}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherDisplay;
