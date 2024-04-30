import {
  GET_ALL_FAVORITES,
  ADD_TO_FAVORITES,
  FILTER,
  REMOVE_FAVORITE,
  GET_CHARACTER_BY_NAME,
  SORT,
  RESET,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GET_ALL_CHARACTERS,
  GET_ALL_EPISODES,
  GET_ALL_LOCATIONS,
} from "../redux/types";

let initialState = {
  characters: [],
  charactersCopy: [],
  episodes: [],
  episodesCopy: [],
  locations: [],
  locationsCopy: [],
  favorites: [],
  favoritesCopy: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_FAVORITES:
      return {
        ...state,
        favorites: action.payload,
        favoritesCopy: action.payload,
      };

    //_____________________________________FAVORITES
    case ADD_TO_FAVORITES:
    case REMOVE_FAVORITE:
      return {
        ...state,
        favorites: [...action.payload],
        favoritesCopy: [...action.payload],
      };

    //_____________________________________CHARACTERS
    case GET_ALL_CHARACTERS:
      return {
        ...state,
        characters: action.payload,
      };

    //_____________________________________EPISODES
    case GET_ALL_EPISODES:
      return {
        ...state,
        episodes: action.payload,
      };

    //___________________________________LOCATIONS
    case GET_ALL_LOCATIONS:
      return {
        ...state,
        locations: action.payload,
      };

    //___________________________________FILTERS
    case GET_CHARACTER_BY_NAME:
      return {
        ...state,
        characters: action.payload,
      };

    case FILTER:
      return {
        ...state,
        favoritesCopy: state.favorites.filter(
          (character) => character.gender === action.payload
        ),
      };

    case SORT:
      let sorted;
      if (action.payload === "ascendente") {
        sorted = [...state.favoritesCopy].sort((a, b) =>
          a.id > b.id ? 1 : -1
        );
      } else if (action.payload === "descendente") {
        sorted = [...state.favoritesCopy].sort((a, b) =>
          b.id > a.id ? 1 : -1
        );
      }

      return {
        ...state,
        favoritesCopy: sorted,
      };

    case RESET:
      return {
        ...state,
        favoritesCopy: state.favorites,
      };

    //_____________________________________________________AUTH

    case LOGIN_REQUEST:
      return { ...state, loading: true, error: null };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.payload.token,
        error: null,
      };
    case LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload.error };

    default:
      return state;
  }
}

export default rootReducer;
