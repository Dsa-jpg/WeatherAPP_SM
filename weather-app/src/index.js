import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import WeatherContainer from './Components/WeatherContainer';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WeatherContainer />
  </React.StrictMode>
);


