import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { sortById, filterByGender, reset, getCharByName } from "../../redux/action";

import style from "./SearchBar.module.css";

export default function SearchBar({ onSearch }) {
  const dispatch = useDispatch();
  const location = useLocation();

  const [searchString, setSearchString] = useState("");
  const characters = useSelector((state) => state.characters)
  const [filteredCharacters, setFilteredCharacters] = useState([]);


  function handleChange(event) {
    const searchText = event.target.value;
    setSearchString(searchText);
    filterCharacters(searchText);
  }

  function filterCharacters(searchText) {
    if (searchText.trim() === "") {
      setFilteredCharacters([]);
    } else {
      const filtered = characters.filter((character) =>
        character.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredCharacters(filtered);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

  }

  function renderSearchResults() {
    return (
      <div className={style.list}>
        <ul>
          {filteredCharacters.map((character) => (
            <div className={style.element} key={character.id}>
              <li>{character.name}</li>
              <img
                src={character.image}
                alt={character.name}
                className={style.charImg}
              />
            </div>
          ))}
        </ul>
      </div>
    );
  }

  function randomHandler() {
    let memoria = [];
    let randomId = (Math.random() * 826).toFixed();
    randomId = Number(randomId);
    if (!memoria.includes(randomId)) {
      memoria.push(randomId);
    } else {
      alert("What a coincidence... this dumb is alredy here");
      return;
    }
  }

  function getRandomCharacter() {
    const randomId = Math.floor(Math.random() * 826) + 1;
    onSearch(randomId);
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
        type="text"
        onChange={handleChange}
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
         // onClick={() => onSearch(id)}
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
      {filteredCharacters.length > 0 && searchString !== "" && renderSearchResults()}
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
