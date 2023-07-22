import {
    configureStore,
    combineReducers,
    getDefaultMiddleware,
  } from "@reduxjs/toolkit";
  
import logger from "redux-logger";
  
import { authenticationSlice } from "./slice/authenticaitonSlice";
  
const reducer = combineReducers({
    authentication: authenticationSlice.reducer, // .reducer'ı ekleyin
  });
  
export const store = configureStore({
    reducer,
    middleware: getDefaultMiddleware().concat(logger), // getDefaultMiddleware() şeklinde değiştirin
  });
  
  export default store;