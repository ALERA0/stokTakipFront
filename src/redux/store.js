import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";

import logger from "redux-logger";

import { authSlice, getAllProductsSlice, getProductDetailSlice } from "./slice";

const reducer = combineReducers({
  auth: authSlice,
  getAllProducts: getAllProductsSlice,
  getProductDetail: getProductDetailSlice,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
