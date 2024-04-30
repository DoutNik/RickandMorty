import axios from "axios";

import {
  GET_ALL_FAVORITES,
  ADD_TO_FAVORITES,
  REMOVE_FAVORITE,
  SORT,
  GET_ALL_CHARACTERS,
  GET_CHARACTER_BY_NAME,
  FILTER,
  RESET,
  REGISTER,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  USER_DATA,
  GET_ALL_EPISODES,
  GET_ALL_LOCATIONS,
} from "./types";

// --------------------------------------   FAVORITES  -------------------------------------------------

export const getAllFavorites = () => {
  return async (dispatch) => {
    try{
      const response = await axios("/allFavorites")
      return dispatch({
        type: GET_ALL_FAVORITES,
        payload: response.data
      })
    } catch (error) {
      console.log(error);
    }
  };
};

export const addFavorite = (character) => {
  const endpoint = "/fav";
  return async (dispatch) => {
    try {
      const {data} = await axios.post(endpoint, character);
      return dispatch({
        type: ADD_TO_FAVORITES,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const removeFavorite = (id) => {
  const endpoint = "/fav" + id;
  return async (dispatch) => {
    try {
      const {data} = await axios.delete(endpoint);

      return dispatch({
        type: REMOVE_FAVORITE,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

// --------------------------------------   CHARACTERS  -------------------------------------------------

export function getAllCharacters() {
  return async function (dispatch) {
    const response = await axios(`/getAllCharacters`);
    return dispatch({
      type: GET_ALL_CHARACTERS,
      payload: response.data,
    });
  };
}

// --------------------------------------   EPISODES  -------------------------------------------------
export function getAllEpisodes() {
  return async function (dispatch) {
    const response = await axios(`/getAllEpisodes`);
    return dispatch({
      type: GET_ALL_EPISODES,
      payload: response.data,
    });
  };
}

// --------------------------------------   LOCATIONS  -------------------------------------------------
export function getAllLocations() {
  return async function (dispatch) {
    const response = await axios(`/getAllLocations`);
    return dispatch({
      type: GET_ALL_LOCATIONS,
      payload: response.data,
    });
  };
}

// --------------------------------------   FILTERS  -------------------------------------------------
export function getCharByName(name) {
  return async function (dispatch) {
    const response = await axios(`/getCharacterByName/${name}`);
    return dispatch({
      type: GET_CHARACTER_BY_NAME,
      payload: response.data,
    });
  };
}

export function filterByGender(gender) {
  return {
    type: FILTER,
    payload: gender,
  };
}

export function sortById(order) {
  return {
    type: SORT,
    payload: order,
  };
}

export function reset() {
  return {
    type: RESET,
  };
}


// --------------------------------------   REGISTER  -------------------------------------------------


export const registerUser = (userData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('/register', userData);
      dispatch({ type: REGISTER, payload: response.data });
      return response.data
    } catch (error) {   
      console.error('Error en el registro:', error.message);
    }
  };
};


// --------------------------------------   LOGIN  -------------------------------------------------


export const loginUser = (userData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOGIN_REQUEST });
      const response = await axios.post('/login', userData)
      console.log(response);
      const token = response.data.token;
      dispatch({ type: LOGIN_SUCCESS, payload: { token } });
      return response
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      dispatch({ type: LOGIN_FAILURE, payload: error });
      return error
    }
  };
};

//___________________________________________________USERS______________________________________________________

export function saveUserData(userData) {
  return {
    type: USER_DATA,
    payload: userData,
  };
}
