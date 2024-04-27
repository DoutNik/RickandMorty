import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { sortById, filterByGender, reset } from "../../redux/action";

import style from "./SearchBar.module.css";
import axios from "axios";

export default function SearchBar({ onSearch }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();


  const [id, setId] = useState("");
  const [characters, setCharacters] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchError, setSearchError] = useState("");
  const [searchString, setSearchString] = useState("");

  async function searchHandler(id) {
    try {
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

  async function handleSubmit(event) {
    event.preventDefault();
    if (
      !location.pathname.includes("/mapa") &&
      !location.pathname.includes("/dashboard")
    ) {
      navigate("/resultados");
    }

    try {
      //const storePromise = dispatch(getStoreByName(searchString));
      //const postPromise = dispatch(getPostByName(searchString));

      //await Promise.all([storePromise, postPromise]);
    } catch (error) {
      console.log(error);
    }
  }

  const vibrateDevice = () => {
    window.navigator?.vibrate?.(20);
  };

  
  const renderRandomButton = location.pathname === "/home" || location.pathname === "/favorites";

  if (!renderRandomButton) {
    
    return null;
  }
  return (
    <>
    <div className={style.searchBar}> 
    <form onSubmit={handleSubmit}>
      <input
        type="search"
        id="searchInput"
        onChange={changeHandler}
        value={searchString}
        placeholder="Search Character"
      />
      <svg
            onClick={handleSubmit}
            width="17"
            height="16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-labelledby="search"
          >
             <path
              d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
              stroke="currentColor"
              strokeWidth="1.333"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        <button
        type="submit"
          className={style.all}  
          onClick={() => onSearch(id)}
        >
          Add character
        </button>
      {/*   {renderRandomButton && (
          <button
            className={style.all2}  
            onClick={getRandomCharacter}
          >
            Add random
          </button>
        )} */}
      </form>
    </div>
      {/* <div>
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
    </div> */}
    </>
  );
}
