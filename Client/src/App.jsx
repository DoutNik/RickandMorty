import { Route, Routes, useLocation } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useAuth0 } from "@auth0/auth0-react";

import Home from "./views/Home/Home.jsx";
import Nav from "./components/nav/Nav.jsx";
import CharacterPage from "./views/detail/Character.jsx";
import EpisodePage from "./views/detail/Episode.jsx";
import LocationPage from "./views/detail/Location.jsx";
import ErrorPage from "./views/error/Error.jsx";
import Login from "./views/login/login.jsx";
import Register from "./views/register/register.jsx";
import FavoritesPage from "./views/favorites/Favorites.jsx";
import AboutPage from "./views/about/About.jsx";
import SearchBar from "./components/searchBar/SearchBar.jsx";

import "./App.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getAllCharacters,
  getAllEpisodes,
  getAllLocations,
  saveUserData,
} from "./redux/action.js";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [characters, setCharacters] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchError, setSearchError] = useState("");
  const { user, isAuthenticated: isAuthenticatedAuth0, isLoading } = useAuth0();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  axios.defaults.baseURL = "http://localhost:3001/";

  const setAuth = (status, user) => {
    setIsAuthenticated(status);
    dispatch(saveUserData(user));
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      axios
        .get("/verify", {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          if (response.data === true) {
            setIsAuthenticated(true);
            axios
              .get("/verifyIdToken", {
                headers: {
                  token: token,
                },
              })
              .then((userDataResponse) => {
                dispatch(
                  saveUserData({
                    email: userDataResponse.data.email,
                    id: userDataResponse.data.id,
                    username: userDataResponse.data.username,
                    image: userDataResponse.data.image,
                    story: userDataResponse.data.story,
                    updatedStory: userDataResponse.data.updatedStory,
                    texto: userDataResponse.data.texto,
                    ciudad: userDataResponse.data.ciudad,
                    direccion: userDataResponse.data.direccion,
                    rol: userDataResponse.data.rol,
                    averageRating: userDataResponse.data.averageRating,
                    tiendas: userDataResponse.data.tiendas,
                    vendedor: userDataResponse.data.vendedor,
                    accT: userDataResponse.data.accT,
                    FCMtoken: userDataResponse.data.FCMtoken,
                  })
                );
                dispatch(getAllCharacters());
                dispatch(getAllEpisodes());
                dispatch(getAllLocations());
              })
              .catch((userDataError) => {
                console.error(
                  "Error al obtener los datos del usuario:",
                  userDataError
                );
              });
          } else {
            setIsAuthenticated(false);
          }
        })
        .catch((error) => {
          console.error("Error al verificar el token:", error);
          setIsAuthenticated(false);
        });
    } else {
      setIsAuthenticated(false);
    }
  }, [isAuthenticated]);

  async function searchHandler(id) {
    try {
      // Validar el ID antes de realizar la solicitud
      if (!id || id < 1 || id > 826) {
        setSearchError("El ID debe estar entre 1 y 826");
        window.alert("El ID debe estar entre 1 y 826");
        return;
      }

      setSearchError(""); // Borrar el error si el ID es válido

      const { data } = await axios(`/character/${id}`);

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
      setSearchError(error.message);
    }
  }

  function closeHandler(id) {
    let filteredCharacters = characters.filter(
      (character) => character.id !== Number(id)
    );

    setCharacters(filteredCharacters);
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

  // Función para manejar cambios en el campo de búsqueda
  function handleSearchInputChange(event) {
    setSearchInput(event.target.value);
  }

  // Función para desactivar el botón "Add Character" si no se cumple la condición
  function isAddCharacterDisabled() {
    return (
      searchInput === "" ||
      searchError !== "" ||
      !/^\d+$/.test(searchInput) ||
      parseInt(searchInput) < 1 ||
      parseInt(searchInput) > 826
    );
  }

  return (
    <>
      {isAuthenticated ? <SearchBar /> : null}
      {isAuthenticated &&
        location.pathname !== "/register" &&
        location.pathname !== "/login" && (
          <Nav
            setAuth={setAuth}
            randomize={randomHandler}
            onSearchInputChange={handleSearchInputChange}
            isAddCharacterDisabled={isAddCharacterDisabled()}
          />
        )}

      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Home characters={characters} />
            ) : (
              <Login setAuth={setAuth} />
            )
          }
        ></Route>
        <Route path="/login" element={<Login setAuth={setAuth} />} />
        <Route path="/register" element={<Register setAuth={setAuth} />} />
        <Route
          path="/home"
          element={
            isAuthenticated ? (
              <Home characters={characters} />
            ) : (
              <Login setAuth={setAuth} />
            )
          }
        />
        <Route
          path="/about"
          element={
            isAuthenticated ? <AboutPage /> : <Login setAuth={setAuth} />
          }
        />
        <Route
          path="/favorites"
          element={
            isAuthenticated ? <FavoritesPage /> : <Login setAuth={setAuth} />
          }
        />
        <Route
          path="/character/:id"
          element={
            isAuthenticated ? <CharacterPage /> : <Login setAuth={setAuth} />
          }
        />
        <Route
          path="/episode/:id"
          element={
            isAuthenticated ? <EpisodePage /> : <Login setAuth={setAuth} />
          }
        />
        <Route
          path="/location/:id"
          element={
            isAuthenticated ? <LocationPage /> : <Login setAuth={setAuth} />
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
