import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

const loginProcess = createAsyncThunk(
  "authentication/loginProcess",
  async (data) => {
    const {email, password} = data;
    const params = new FormData();
    params.append('email', email);
    params.append('password', password);

    try {
      const res = await api.post("login", params);
      console.log(res.data,"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
      return res.data;
    } catch (error) {
      if (error.response) {
        // API yanıtında hata durumu varsa
        throw new Error(error.response.data.status,error.response.data.message);
      } else if (error.request) {
        // İstek yapılamadıysa
        throw new Error("Request failed");
      } else {
        // Diğer hata durumları
        throw new Error(error.message);
      }
    }
  }
);


const logoutProcess = createAsyncThunk(
  'authentication/logoutProcess',
  async () => {
    try {
      const res = await axios.post('logout');
      localStorage.removeItem('@USERDATA');
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
);



export { loginProcess,logoutProcess };
