import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import inputsReducer from "./reducers/inputsReducer";

const reducers = combineReducers({
  inputs: inputsReducer,
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
