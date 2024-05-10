import React from "react";
import "./WeatherDisplay.css";
import { faSun, faCloud, faCloudShowersHeavy, faSnowflake, faSmog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTint, faCompass, faWind, faMoon, faCloudRain, faCloudSun, faCloudBolt } from '@fortawesome/free-solid-svg-icons';

/**
 * Komponenta WeatherDisplay zobrazuje aktuální počasí a předpověď počasí pro dané město.
 * @param {Object} props - Props pro komponentu.
 * @param {Object} props.weather - Data o aktuálním počasí.
 * @param {Object[]} props.forecast - Pole s daty o předpovědi počasí.
 * @returns {JSX.Element} - JSX element reprezentující komponentu WeatherDisplay.
 */
const WeatherDisplay = ({ weather, forecast  }) => {

  /**
   * Funkce pro seskupení předpovědi počasí podle data (den).
   * @param {Object[]} forecastData - Pole s daty o předpovědi počasí.
   * @returns {Object} - Objekt obsahující seskupenou předpověď počasí podle data.
   */
  const groupForecastByDay = (forecastData) => {
    const groupedForecast = {}; // Objekt pro uchování předpovědi počasí seskupené podle data
    forecastData.forEach((item) => { // Procházení dat předpovědi počasí
      const date = item.dt_txt.split(" ")[0]; // Získání data (bez času)
      if (!groupedForecast[date]) { // Pokud pro dané datum neexistuje pole, vytvoří se
        groupedForecast[date] = []; // Vytvoření pole pro dané datum
      }
      groupedForecast[date].push(item); // Přidání dat do pole
    });
    console.log(groupedForecast); // Vypsání seskupených dat do konzole
    return groupedForecast; // Vrácení seskupených dat
  };
  /*
    // Funkce pro zobrazení času východu/západu slunce podle časové zóny země
    const getTimeByCountry = (timestamp, countryCode) => {
      const options = {
        hour12: false, // Nastavte na true pro 12h formát, false pro 24h formát
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      };

    return new Date(timestamp * 1000).toLocaleTimeString(getTimeFormatByCountry(countryCode), options);
  };
  */



  /**
   * Funkce pro získání ikony počasí podle popisu z API.
   * @param {string} weatherType - Popis počasí získaný z API.
   * @returns {JSX.Element|null} - JSX element reprezentující ikonu počasí nebo null, pokud ikona není dostupná.
   */
  const getWeatherIcon = (weatherType) => {
    switch (weatherType) {
      case "clear sky":
      case "clear":
        return <FontAwesomeIcon icon={faSun} style={{ color: "#fdd835" }} />;
      case "few clouds":
        return <FontAwesomeIcon icon={faCloudSun} style={{"--fa-primary-color": "#a3a3a3", "--fa-secondary-color": "#fbff00",}} />;
      case "scattered clouds":
      case "overcast clouds":
      case "broken clouds":
        return <FontAwesomeIcon icon={faCloud} style={{ color: "#90a4ae"  }} />;
      case "heavy intensity shower rain":
      case "moderate rain":
      case "shower rain":
        return <FontAwesomeIcon icon={faCloudRain} style={{"--fa-primary-color": "#525252", "--fa-secondary-color": "#0040ff",}} />;
      case "light intensity shower rain":
      case "rain":
      case "light rain":
        return <FontAwesomeIcon icon={faCloudShowersHeavy} style={{"--fa-primary-color": "#4a4a4a", "--fa-secondary-color": "#005eff",}} />
      case "thunderstorm":
        return <FontAwesomeIcon icon={faCloudBolt} style={{"--fa-primary-color": "#575757", "--fa-secondary-color": "#fbff00",}} />;
      case "light snow":
      case "snow":
        return <FontAwesomeIcon icon={faSnowflake} style={{ color: "#ADD8E6" }} />;
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
              <p><FontAwesomeIcon icon={faTint} style={{ color: "#ADD8E6" }} /> Humidity: {weather.Humidity}%</p>
              <p><FontAwesomeIcon icon={faCompass} style={{color: "gray"}} /> Pressure: {weather.Pressure}hPa</p>
              <p><FontAwesomeIcon icon={faWind}  style={{ color: "#90a4ae"  }} /> Wind Speed: {weather.WindSpeed}m/s</p>
              <p><FontAwesomeIcon icon={faSun} style={{ color: "#fdd835" }} /> Sunrise: {weather.SunRise} </p>
              <p><FontAwesomeIcon icon={faMoon}  /> Sunset: {weather.SunSet}</p>
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
                        {/*<p>{getTimeByCountry(item.dt, Country)}</p>  Čas podle země */}
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
