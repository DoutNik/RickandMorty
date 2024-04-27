import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "@redux-devtools/extension";
import rootReducer from "../redux/reducer";
import thunk from "redux-thunk";

export default createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
