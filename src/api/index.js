import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/";
// const API_KEY = 'SSVa97j7z83nMXDzhmmdHSSLPG9NueDf3J6BgCSS';

axios.defaults.baseURL = API_BASE_URL;
// axios.defaults.headers['X-API-KEY'] = API_KEY;
axios.defaults.headers["Content-Type"] = "multipart/form-data";

const login = (thunkAPI) => {
  localStorage.getItem("@USERDATA").then((res) => {
    const { email, password } = JSON.parse(res);
    thunkAPI.dispatch(
      authLogin({
        email,
        password,
      })
    );
  });
};

const authLogin = createAsyncThunk("auth/authLogin", async (data) => {
  const { email, password } = data;
  const params = new FormData();
  params.append("email", email);
  params.append("password", password);
  const res = await axios.post("login", params);
  res.data !== undefined
    ? localStorage.setItem("@USERDATA", JSON.stringify(data))
    : null;
  return res.data;
});

const authLogOut = createAsyncThunk("auth/authLogOut", async () => {
  const res = await axios.post("logout");
  localStorage.removeItem("@USERDATA");
  return res.data;
});

const getAllProductsProcess = createAsyncThunk(
  "getAllProducts/getAllProductsProcess",
  async () => {
    const res = await axios.get("getAllProducts");
    return res.data;
  }
);
const getProductDetailProcess = createAsyncThunk(
  "productDetail/getProductDetailProcess",
  async (data) => {
    const { _id } = data;
    const params = new FormData();
    params.append("_id", _id);
    const res = await axios.post("productDetail", params);
    return res.data;
  }
);
const productDeleteProcess = createAsyncThunk(
  "productDelete/productDeleteProcess",
  async (data) => {
    const { _id } = data;
    const params = new FormData();
    params.append("_id", _id);
    try {
      const res = await axios.post("productDelete", params);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

const getAllOrdersProcess = createAsyncThunk(
  "getAllOrders/getAllOrdersProcess",
  async () => {
    const res = await axios.get("getlAllOrders");
    return res.data;
  }
);

const getTedarikciOrdersProcess = createAsyncThunk(
  "getTedarikciOrders/getTedarikciOrdersProcess",
  async () => {
    const res = await axios.get("getTedarikciOrders");
    return res.data;
  }
);

const getMusteriOrdersProcess = createAsyncThunk(
  "getMusteriOrders/getMusteriOrdersProcess",
  async () => {
    const res = await axios.get("getMusteriOrders");
    return res.data;
  }
);

const getOrderDetailProcess = createAsyncThunk(
  "orderDetail/getOrdersDetailProcess",
  async (data) => {
    const { _id } = data;
    const params = new FormData();
    params.append("_id", _id);
    const res = await axios.post("orderDetail", params);
    return res.data;
  }
);

const getAllDocumentsProcess = createAsyncThunk(
  "allDocuments/getAllDocumentsProcess",
  async () => {
    try {
      const res = await axios.get("allDocuments");
      return res.data;
    } catch (error) {
      console.log(
        error,
        "şşşşşşşşşşşşşşşşşşşşşşşşşşşşşşşşşşşşşşşşşşşşşşşşşşşşşşşşşşşş"
      );
    }
  }
);

const getIncomingProductsProcess = createAsyncThunk(
  "getIncomingProducts/getIncomingProductsProcess",
  async () => {
    const res = await axios.get("getIncomingProducts");
    return res.data;
  }
);

const getOutgoingProductsProcess = createAsyncThunk(
  "getOutgoingProducts/getOutgoingProductsProcess",
  async () => {
    try {
      const res = await axios.get("getOutgoingProducts");
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const addNewProductProcess = createAsyncThunk(
  "addNewProduct/addNewProductProcess",
  async (data) => {
    const {
      productCode,
      productName,
      productPrice,
      productQuantity,
      productDescription,
      productPackageType,
      productBarcode,
      productAddress,
    } = data;
    const params = new FormData();
    params.append("productCode", productCode);
    params.append("productName", productName);
    params.append("productPrice", productPrice);
    params.append("productQuantity", productQuantity);
    params.append("productDescription", productDescription);
    params.append("productPackageType", productPackageType);
    params.append("productBarcode", productBarcode);
    params.append("productAddress", productAddress);
    try {
      const res = await axios.post("addProduct", params);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

const updateProductProcess = createAsyncThunk(
  "productUpdate/updateProductProcess",
  async (data) => {
    const {
      _id,
      productCode,
      productName,
      productPrice,
      productDescription,
      productPackageType,
      productBarcode,
      productAddress,
    } = data;
    const params = new FormData();
    params.append("_id", _id);
    params.append("productCode", productCode);
    params.append("productName", productName);
    params.append("productPrice", productPrice);
    params.append("productDescription", productDescription);
    params.append("productPackageType", productPackageType);
    params.append("productBarcode", productBarcode);
    params.append("productAddress", productAddress);
    try {
      const res = await axios.post("productUpdate", params);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

const addNewOrderProcess = createAsyncThunk(
  "newOrder/addNewOrderProcess",
  async (data) => {
    const { tcNumber, isim, email, telefon, adres, ozellik } = data;
    try {
      const res = await axios.post("newOrder", data);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

const addIncomingProductProcess = createAsyncThunk(
  "addIncomingProduct/addIncomingProductProcess",
  async (data) => {
    const { documentDate, documentNumber, order, description } = data;
    const params = new FormData();
    params.append("documentNumber", documentNumber);
    if (order) {
      params.append("order", order);
    }
    params.append("description", description);
    params.append("documentDate", documentDate);

    try {
      const res = await axios.post("addIncomingProduct", params);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

const addOutgoingProductProcess = createAsyncThunk(
  "addOutgoingProduct/addOutgoingProductProcess",
  async (data) => {
    const { documentNumber, order, description, documentDate } = data;
    const params = new FormData();
    params.append("documentNumber", documentNumber);
    if (order) {
      params.append("order", order);
    }
    params.append("description", description);
    params.append("documentDate", documentDate);
    try {
      const res = await axios.post("addOutgoingProduct", params);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

const deleteOrderProcess = createAsyncThunk(
  "deleteOrder/deleteOrderProcess",
  async (data) => {
    const { _id } = data;
    const params = new FormData();
    params.append("_id", _id);
    try {
      const res = await axios.post("deleteOrder", params);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

const getIncomingTransactionsProcess = createAsyncThunk(
  "listTransactions/getIncomingTransactionsProcess",
  async (data) => {
    const { _id } = data;
    const params = new FormData();
    params.append("_id", _id);
    const res = await axios.post("listTransactions", params);
    return res.data;
  }
);

const updateOrderProcess = createAsyncThunk(
  "updateOrder/updateOrderProcess",
  async (data) => {
    const { _id, tcNumber, isim, email, telefon, adres, ozellik } = data;
    const params = new FormData();
    params.append("_id", _id);
    params.append("tcNumber", tcNumber);
    params.append("isim", isim);
    params.append("email", email);
    params.append("telefon", telefon);
    params.append("adres", adres);
    params.append("ozellik", ozellik);
    try {
      const res = await axios.post("updateOrder", params);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

const getIncomingProductDetailProcess = createAsyncThunk(
  "incomingProductdetail/getIncomingProductDetailProcess",
  async (data) => {
    const { incomingProductId } = data;
    const params = new FormData();
    params.append("incomingProductId", incomingProductId);
    const res = await axios.post("incomingProductdetail", params);
    return res.data;
  }
);

const getOutgoingProductDetailProcess = createAsyncThunk(
  "outgoingProductdetail/getOutgoingProductDetailProcess",
  async (data) => {
    const { outgoingProductId } = data;
    const params = new FormData();
    params.append("outgoingProductId", outgoingProductId);
    const res = await axios.post("outgoingProductdetail", params);
    return res.data;
  }
);

const updateIncomingDocProductQuantityProcess = createAsyncThunk(
  "updateIncomingProductQuantity/updateIncomingDocProductQuantityProcess",
  async (data) => {
    const { incomingProductId, rowId, newQuantity } = data;
    const params = new FormData();
    params.append("incomingProductId", incomingProductId);
    params.append("rowId", rowId);
    params.append("newQuantity", newQuantity);

    try {
      const res = await axios.post("updateIncomingProductQuantity", params);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

const updateOutgoingDocProductQuantityProcess = createAsyncThunk(
  "updateOutgoingProductQuantity/updateOutgoingDocProductQuantityProcess",
  async (data) => {
    const { outgoingProductId, rowId, newQuantity } = data;
    const params = new FormData();
    params.append("outgoingProductId", outgoingProductId);
    params.append("rowId", rowId);
    params.append("newQuantity", newQuantity);

    try {
      const res = await axios.post("updateOutgoingProductQuantity", params);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

const deleteProductFromIncomingProductProcess = createAsyncThunk(
  "removeProduct/deleteProductFromIncomingProductProcess",
  async (data) => {
    const { incomingProductId, rowId } = data;
    const params = new FormData();
    params.append("incomingProductId", incomingProductId);
    params.append("rowId", rowId);
    try {
      const res = await axios.post("removeProduct", params);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

const deleteProductFromOutgoingProductProcess = createAsyncThunk(
  "removeOutgoingProduct/deleteProductFromOutgoingProductProcess",
  async (data) => {
    const { outgoingProductId, rowId } = data;
    const params = new FormData();
    params.append("outgoingProductId", outgoingProductId);
    params.append("rowId", rowId);
    try {
      const res = await axios.post("removeOutgoingProduct", params);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

const addIncomingProductToIncomingProductProcess = createAsyncThunk(
  "addProductToIncomingProduct/addIncomingProductToIncomingProductProcess",
  async (data) => {
    const { incomingProductId, productId, productQuantity } = data;
    const params = new FormData();
    params.append("incomingProductId", incomingProductId);
    params.append("productId", productId);
    params.append("productQuantity", productQuantity);
    try {
      const res = await axios.post("addProductToIncomingProduct", params);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

const addIncomingProductToOutgoingProductProcess = createAsyncThunk(
  "addProductToOutgoingProduct/addIncomingProductToOutgoingProductProcess",
  async (data) => {
    const { outgoingProductId, productId, productQuantity } = data;
    const params = new FormData();
    params.append("outgoingProductId", outgoingProductId);
    params.append("productId", productId);
    params.append("productQuantity", productQuantity);
    try {
      const res = await axios.post("addProductToOutgoingProduct", params);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

const updateOutgoingDocProcess = createAsyncThunk(
  "updateOutgoingProduct/updateOutgoingDocProcess",
  async (data) => {
    const { documentDate, documentNumber, order, description, _id } = data;
    const params = new FormData();
    params.append("documentDate", documentDate);
    params.append("documentNumber", documentNumber);
    if (order) {
      params.append("order", order);
    }
    params.append("description", description);
    params.append("_id", _id);

    try {
      const res = await axios.post("updateOutgoingProduct", params);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

const updateIncomingDocProcess = createAsyncThunk(
  "updateIncomingProduct/updateIncomingDocProcess",
  async (data) => {
    const { documentDate, documentNumber, order, description, _id } = data;
    const params = new FormData();
    params.append("documentDate", documentDate);
    params.append("documentNumber", documentNumber);
    if (order) {
      params.append("order", order);
    }
    params.append("description", description);
    params.append("_id", _id);

    try {
      const res = await axios.post("updateIncomingProduct", params);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

export {
  authLogin,
  authLogOut,
  getAllProductsProcess,
  getProductDetailProcess,
  getAllOrdersProcess,
  getTedarikciOrdersProcess,
  getMusteriOrdersProcess,
  getOrderDetailProcess,
  getAllDocumentsProcess,
  getIncomingProductsProcess,
  getOutgoingProductsProcess,
  addNewProductProcess,
  updateProductProcess,
  addNewOrderProcess,
  productDeleteProcess,
  addIncomingProductProcess,
  deleteOrderProcess,
  getIncomingTransactionsProcess,
  updateOrderProcess,
  getIncomingProductDetailProcess,
  getOutgoingProductDetailProcess,
  updateIncomingDocProductQuantityProcess,
  updateOutgoingDocProductQuantityProcess,
  deleteProductFromIncomingProductProcess,
  deleteProductFromOutgoingProductProcess,
  addIncomingProductToIncomingProductProcess,
  addOutgoingProductProcess,
  addIncomingProductToOutgoingProductProcess,
  updateOutgoingDocProcess,
  updateIncomingDocProcess,
};
