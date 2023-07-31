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
  addIncomingProductSlice,
  deleteOrderSlice,
  updateOrderSlice,
  getIncomingProductDetailSlice,
  getOutgoingProductDetailSlice,
  updateIncomingProductQuantitySlice,
} from './slice';


const reducer = combineReducers({
  auth: authSlice,
  getAllProducts: getAllProductsSlice,
  getProductDetail: getProductDetailSlice,
  getAllOrders: getAllOrdersSlice,
  getTedarikciOrders: getTedarikciOrdersSlice,
  getMusteriOrders: getMusteriOrdersSlice,
  orderDetail: getOrderDetailSlice,
  allDocuments: getAllDocumentsSlice,
  getIncomingProducts: getIncomingProductsSlice,
  getOutgoingProducts: getOutgoingProductsSlice,
  addNewProduct: addNewProductSlice,
  updateProduct: updateProductSlice,
  productDelete: productDeleteSlice,
  addIncomingProduct: addIncomingProductSlice,
  deleteOrder: deleteOrderSlice,
  updateOrder: updateOrderSlice,
  incomingProductdetail: getIncomingProductDetailSlice,
  outgoingProductdetail: getOutgoingProductDetailSlice,
  updateIncomingProductQuantity: updateIncomingProductQuantitySlice,
  



});

export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
});