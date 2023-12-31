import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";

import logger from "redux-logger";

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
  getIncomingTransactionsSlice,
  updateOrderSlice,
  getIncomingProductDetailSlice,
  getOutgoingProductDetailSlice,
  deleteProductFromIncomingProductSlice,
  deleteProductFromOutgoingProductSlice,
  updateIncomingDocProductQuantitySlice,
  updateOutgoingDocProductQuantitySlice,
  addIncomingProductToIncomingProductSlice,
  addOutgoingProductSlice,
  addIncomingProductToOutgoingProductSlice,
  updateOutgoingDocSlice,
  updateIncomingDocSlice,
  addNewOrderSlice,
} from "./slice";

const reducer = combineReducers({
  auth: authSlice,
  getAllProducts: getAllProductsSlice,
  productDetail: getProductDetailSlice,
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
  addOutgoingProduct: addOutgoingProductSlice,
  deleteOrder: deleteOrderSlice,
  listTransactions: getIncomingTransactionsSlice,
  updateOrder: updateOrderSlice,
  incomingProductdetail: getIncomingProductDetailSlice,
  outgoingProductdetail: getOutgoingProductDetailSlice,
  updateIncomingProductQuantity: updateIncomingDocProductQuantitySlice,
  updateOutgoingProductQuantity: updateOutgoingDocProductQuantitySlice,
  removeProduct: deleteProductFromIncomingProductSlice,
  removeOutgoingProduct: deleteProductFromOutgoingProductSlice,
  addProductToIncomingProduct: addIncomingProductToIncomingProductSlice,
  addProductToOutgoingProduct: addIncomingProductToOutgoingProductSlice,
  updateOutgoingProduct: updateOutgoingDocSlice,
  updateIncomingProduct: updateIncomingDocSlice,
  newOrder: addNewOrderSlice,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
