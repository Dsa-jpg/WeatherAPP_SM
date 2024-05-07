import React, { useState } from "react";
import './SearchForm.css';

const SearchForm = ({ onSearch }) => {
  const [city, setCity] = useState(""); // Stav pro uchování hodnoty zadaného města

  const handleChange = (e) => {
    setCity(e.target.value); // Aktualizace stavu při změně vstupního pole
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Zabraňuje výchozímu chování formuláře (tj. odeslání)
    onSearch(city); // Volání funkce onSearch z nadřazené komponenty s hodnotou zadaného města
  };

  return (
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
  );
};

export default SearchForm;
