import axios from "axios";

import {
  GET_ALL_FAVORITES,
  ADD_TO_FAVORITES,
  REMOVE_FAVORITE,
  SORT,
  GET_CHARACTER_BY_NAME,
  FILTER,
  RESET,
  REGISTER,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  USER_DATA,
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

// --------------------------------------   FILTERS  -------------------------------------------------

export function getCharByName(name) {
  //const storedCity = localStorage.getItem("selectedCity");
  return async function (dispatch) {
    const response = await axios(`/getCharacterByName/name?name=${name}`);
    return dispatch({
      type: GET_CHARACTER_BY_NAME,
      payload: response,
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
