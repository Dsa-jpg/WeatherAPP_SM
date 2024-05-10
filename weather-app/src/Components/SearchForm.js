import React, { useState } from "react";
import './SearchForm.css';

/**
 * Komponenta SearchForm slouží k vyhledávání počasí pro zadané město.
 * @param {Object} props - Props pro komponentu.
 * @param {Function} props.onSearch - Funkce, která se volá při odeslání formuláře s vyhledávacím dotazem.
 * @param {string} props.error - Chybová zpráva, která se zobrazí, pokud dojde k chybě při vyhledávání.
 * @returns {JSX.Element} - JSX element reprezentující komponentu SearchForm.
 */
const SearchForm = ({ onSearch, error }) => {
  const [city, setCity] = useState(""); // Stav pro uchování hodnoty zadaného města

  /**
   * Funkce pro aktualizaci stavu města při změně vstupního pole.
   * @param {Object} e - Událost změny vstupního pole.
   */
  const handleChange = (e) => {
    setCity(e.target.value); // Aktualizace stavu při změně vstupního pole
  };

  /**
   * Funkce pro odeslání formuláře s aktuální hodnotou města.
   * Zabraňuje výchozímu chování formuláře (tj. odeslání).
   * @param {Object} e - Událost odeslání formuláře.
   */
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
