import React, { useState } from "react";
import axios from "axios";
import SearchForm from "./SearchForm";
import WeatherDisplay from "./WeatherDisplay";

const WeatherContainer = () => {
  const [weather, setWeather] = useState(null); // Stav pro uchování dat o počasí

  const API_KEY = '4a9c12be42a7839f8a38931d4d2f2173';

  const fetchWeatherData = async (city) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );
      const weatherForecast = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`
        );
      console.log(weatherForecast.data);
      
      const currentWeather = response.data;

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
        SunRise: new Date(currentWeather.sys.sunrise * 1000).toLocaleTimeString(),
        SunSet: new Date(currentWeather.sys.sunset * 1000).toLocaleTimeString(),
      });
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  return (
    <div>
      <h1>Weather App</h1>
      <SearchForm onSearch={fetchWeatherData} /> 
      <WeatherDisplay weather={weather} /> 
    </div>
  );
};

export default WeatherContainer;
