import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';

import logger from 'redux-logger';

import {
  authSlice,
  getAllDocumentsSlice,
  getAllOrdersSlice,
  getAllProductsSlice,
  getIncomingProductsSlice,
  getMusteriOrdersSlice,
  getOrderDetailSlice,
  getOutgoingProductsSlice,
  getProductDetailSlice,
  getTedarikciOrdersSlice,
  addNewProductSlice,
  updateProductSlice,
  productDeleteSlice,
} from './slice';


const reducer = combineReducers({
  auth: authSlice,
  getAllProducts: getAllProductsSlice,
  getProductDetail: getProductDetailSlice,
  getAllOrders: getAllOrdersSlice,
  getTedarikciOrders: getTedarikciOrdersSlice,
  getMusteriOrders: getMusteriOrdersSlice,
  getOrderDetail: getOrderDetailSlice,
  allDocuments: getAllDocumentsSlice,
  getIncomingProducts: getIncomingProductsSlice,
  getOutgoingProducts: getOutgoingProductsSlice,
  addNewProduct: addNewProductSlice,
  updateProduct: updateProductSlice,
  productDelete: productDeleteSlice,


});

export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
});