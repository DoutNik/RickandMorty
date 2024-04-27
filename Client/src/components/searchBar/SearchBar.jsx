import { useState } from "react";
import {useDispatch} from "react-redux";
import { useLocation } from "react-router-dom";
import { sortById, filterByGender, reset } from "../../redux/action";

import "./SearchBar.css"; // Importa el archivo CSS para SearchBar
import axios from "axios";

export default function SearchBar({ onSearch }) {
  const dispatch = useDispatch();
  const location = useLocation();

  const [id, setId] = useState("");
  const [characters, setCharacters] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchError, setSearchError] = useState("");

  async function searchHandler(id) {
    try {
      // Validar el ID antes de realizar la solicitud
      if (!id || id < 1 || id > 826) {
        setSearchError("El ID debe estar entre 1 y 826");
        window.alert("El ID debe estar entre 1 y 826");
        return;
      }
  
      setSearchError(""); // Borrar el error si el ID es válido
  
      const { data } = await axios(
        `/character/${id}`
      );
  
      if (data.id) {
        // Verificar si el personaje ya está en la lista antes de agregarlo
        if (!characters.some((character) => character.id === data.id)) {
          setCharacters((oldChars) => [...oldChars, data]);
        } else {
          alert("Ese personaje ya fue agregado");
        }
      } else {
        throw new Error("¡No hay personajes con este ID!");
      }
    } catch (error) {
      setSearchError(error.message); // Mostrar el mensaje de error de búsqueda
    }
  }

  function randomHandler() {
    let memoria = [];

    let randomId = (Math.random() * 826).toFixed();

    randomId = Number(randomId);

    if (!memoria.includes(randomId)) {
      memoria.push(randomId);
      searchHandler(randomId);
    } else {
      alert("What a coincidence... this dumb is alredy here");
      return;
    }
  }

  function changeHandler(event) {
    setId(event.target.value);
  }

  function getRandomCharacter() {
    const randomId = Math.floor(Math.random() * 826) + 1;
    onSearch(randomId);
    setId("");
  }

  function sortHandler(event) {
    dispatch(sortById(event.target.value));
  }

  function filterHandler(event) {
    dispatch(filterByGender(event.target.value));
  }

  function resetHandler() {
    dispatch(reset());
  }

  
  const renderRandomButton = location.pathname === "/home" || location.pathname === "/favorites";

  if (!renderRandomButton) {
    
    return null;
  }
  return (
    <div className="search-bar-container"> 
      <input
        className="searchInput"
        type="search"
        id="searchInput"
        onChange={changeHandler}
        value={id}
        placeholder="Search Character"
      />
      <div className="search-buttons">
        <button
          className={`search-bar-button ${renderRandomButton && "random-button"}`} 
          onClick={() => onSearch(id)}
        >
          Add character
        </button>
        {renderRandomButton && (
          <button
            className="search-bar-button random-button" 
            onClick={getRandomCharacter}
          >
            Add random
          </button>
        )}
      </div>
      <div>
      <label htmlFor="genderSelect">Filtrar por género:</label>
      <select placeholder="Gender" id="genderSelect" onChange={filterHandler}>
        {["Male", "Female", "unknown", "Genderless"].map((gender) => (
          <option key={gender} value={gender}>
            {gender}
          </option>
        ))}
      </select>
      <label htmlFor="sortSelect">Ordenar por ID:</label>
      <select placeholder="Sort" id="sortSelect" onChange={sortHandler}>
        <option value="ascendente">A ~ Z order</option>
        <option value="descendente">Z ~ A order</option>
      </select>
      <button onClick={resetHandler}>Show all</button>
    </div>
    </div>
  );
}
