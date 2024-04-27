import {
  GET_ALL_FAVORITES,
  ADD_TO_FAVORITES,
  FILTER,
  REMOVE_FAVORITE,
  SORT,
  RESET,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from "../redux/types";

let initialState = {
  favorites: [],
  favoritesCopy: [],
  auth: {
    token: null,
    loading: false,
    error: null,
  },
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_FAVORITES:
      return {
        ...state,
        favorites: action.payload,
        favoritesCopy: action.payload,
      };

    case ADD_TO_FAVORITES:
    case REMOVE_FAVORITE:
      return {
        ...state,
        favorites: [...action.payload],
        favoritesCopy: [...action.payload],
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
        sorted = [...state.favoritesCopy].sort((a, b) => (a.id > b.id ? 1 : -1));
      } else if (action.payload === "descendente") {
        sorted = [...state.favoritesCopy].sort((a, b) => (b.id > a.id ? 1 : -1));
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
