import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cardReducer from "./cards/slice";

const reducer = combineReducers({
  cardReducer: cardReducer.reducer,
});

const store = configureStore({
  reducer,
});

export default store;
