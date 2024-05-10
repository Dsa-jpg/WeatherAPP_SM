import React, { useState } from "react";
import axios from "axios";
import SearchForm from "./SearchForm";
import WeatherDisplay from "./WeatherDisplay";
import "./WeatherContainer.css";

/**
 * Komponenta WeatherContainer slouží jako nadřazená komponenta pro zobrazování aktuálního počasí a předpovědi počasí.
 * @returns {JSX.Element} - JSX element reprezentující komponentu WeatherContainer.
 */
const WeatherContainer = () => {
  const [weather, setWeather] = useState(null); // Stav pro uchování dat o počasí
  const [forecast, setForecast] = useState(null); // Stav pro uchování dat o předpovědi počasí
  const [error, setError] = useState(null); // Stav pro uchování chybové zprávy

  const API_KEY = '4a9c12be42a7839f8a38931d4d2f2173';

  /**
   * Funkce pro nastavení formátu času podle země.
   * @param {string} countryCode - Kód země.
   * @returns {string} - Formát času pro danou zemi.
   */ 
  function getTimeFormatByCountry(countryCode) {
    switch (countryCode) {
        case 'CZ':
            return 'cs-CZ'; // český formát času
        case 'US':
            return 'en-US'; // americký formát času
        case 'GB':
            return 'en-GB'; // britský formát času
        case 'DE': 
            return 'de-DE'; // německý formát času
        case 'FR':
            return 'fr-FR'; // francouzský formát času
        case 'ES':
            return 'es-ES'; // španělský formát času
        case 'IT':
            return 'it-IT'; // italský formát času
        default:
            return 'cs-CZ'; // výchozí nastavení, pokud není země známa
    }
}

  /**
   * Funkce pro načtení dat o počasí a předpovědi počasí pro zadané město.
   * @param {string} city - Název města.
   */
  const fetchWeatherData = async (city) => {

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );
      const weatherForecast = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`
        );
      console.log(weatherForecast.data);

      setForecast(weatherForecast.data.list);

      
      const currentWeather = response.data;

      console.log(currentWeather);

      const temperatureToCelsius = currentWeather.main.temp - 273.15;
      setWeather({
        Date: new Date().toLocaleDateString(),
        Temperature: temperatureToCelsius,
        City: currentWeather.name,
        Country: currentWeather.sys.country,
        Description: currentWeather.weather[0].description,
        Humidity: currentWeather.main.humidity,
        Pressure: currentWeather.main.pressure,
        WindSpeed: currentWeather.wind.speed,
        SunRise: new Date(currentWeather.sys.sunrise * 1000).toLocaleTimeString(getTimeFormatByCountry(currentWeather.sys.country)),
        SunSet: new Date(currentWeather.sys.sunset * 1000).toLocaleTimeString(getTimeFormatByCountry(currentWeather.sys.country)),
      });
      setError(null); // Pokud se podaří načíst data, vymaž chybovou zprávu
    } catch (error) {
      console.error('Error fetching data: ', error);
      setError("City not found. Please enter a valid city."); // Nastavení chybové zprávy
    }
  };

  return (
    <div className="weatherConatiner">
      <h1>Weather App</h1>
      {/* Komponenta SearchForm pro vyhledávání města a zobrazení chybové zprávy */}
      <SearchForm onSearch={fetchWeatherData} error={error} /> 
      {/* Komponenta WeatherDisplay pro zobrazení aktuálního počasí a předpovědi počasí */}
      <WeatherDisplay weather={weather} forecast={forecast} />
    </div>
  );
};

export default WeatherContainer;
