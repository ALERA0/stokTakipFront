import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";
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
  const res = await axios.get("logout");
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
  "getProductDetail/getProductDetailProcess",
  async (data) => {
    const { _id } = data;
    const params = new FormData();
    params.append("_id", _id);
    const res = await axios.post("productDetail", params);
    return res.data;
  }
);

export {
  login,
  authLogin,
  authLogOut,
  getAllProductsProcess,
  getProductDetailProcess,
};
