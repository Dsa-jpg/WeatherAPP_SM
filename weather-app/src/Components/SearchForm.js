import React, { useState } from "react";
import './SearchForm.css';

const SearchForm = ({ onSearch, error }) => {
  const [city, setCity] = useState(""); // Stav pro uchování hodnoty zadaného města

  const handleChange = (e) => {
    setCity(e.target.value); // Aktualizace stavu při změně vstupního pole
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Zabraňuje výchozímu chování formuláře (tj. odeslání)
    onSearch(city); // Volání funkce onSearch z nadřazené komponenty s hodnotou zadaného města
  };

  return (
    <div className="div-container">
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="input-field">
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={handleChange}
          />
        </div>
        <button className="button" type="submit">Search</button>
      </form>
      {error && <p className="error-message">{error}</p>} 
    </div>
  );
};

export default SearchForm;
