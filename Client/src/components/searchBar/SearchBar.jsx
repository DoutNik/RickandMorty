import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { sortById, filterByGender, reset } from "../../redux/action";

import style from "./SearchBar.module.css";

export default function SearchBar({ onSearch }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [searchString, setSearchString] = useState("");
  const characters = useSelector((state) => state.characters);
  const episodes = useSelector((state) => state.episodes);
  const locations = useSelector((state) => state.locations);
  const [filteredSearch, setFilteredSearch] = useState([]);

  function handleChange(event) {
    const searchText = event.target.value;
    setSearchString(searchText);
    filterSearch(searchText);
  }

  //filter characters - episodes - locations
  function filterSearch(searchText) {
    if (searchText.trim() === "") {
      setFilteredSearch([]);
    } else {
      const filteredCharacters = characters
        .filter((character) =>
          character.name.toLowerCase().includes(searchText.toLowerCase())
        )
        .map((character) => ({ ...character, type: "character" }));

      const filteredEpisodes = episodes
        .filter((episode) =>
          episode.name.toLowerCase().includes(searchText.toLowerCase())
        )
        .map((episode) => ({ ...episode, type: "episode" }));

      const filteredLocations = locations
        .filter((location) =>
          location.name.toLowerCase().includes(searchText.toLowerCase())
        )
        .map((location) => ({ ...location, type: "location" }));

      const combinedResults = [
        ...filteredCharacters,
        ...filteredEpisodes,
        ...filteredLocations,
      ];

      setFilteredSearch(combinedResults);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
  }
  function renderSearchResults() {
    return (
      <div className={style.list}>
        <ul>
          {filteredSearch.map((result) => (
            <div className={style.element}>
              {result.type === "character" && (
                <Link to={`/character/${result.id}`}>
                  <li>{result.name}</li>
                  <img
                    src={result.image}
                    alt={result.name}
                    className={style.charImg}
                  />
                </Link>
              )}
              {result.type === "episode" && (
                <Link to={`/episode/${result.id}`}>
                  <li>
                    {result.name} - Episode - {result.episode}
                  </li>
                </Link>
              )}
              {result.type === "location" && (
                <Link to={`/location/${result.id}`}>
                  <li>{result.name} - Location</li>
                </Link>
              )}
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

  const renderRandomButton =
    location.pathname === "/home" || location.pathname === "/favorites";

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
        {filteredSearch.length > 0 &&
          searchString !== "" &&
          renderSearchResults()}
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
