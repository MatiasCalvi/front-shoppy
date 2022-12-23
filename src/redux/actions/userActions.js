import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API from "../../config/api";

const ingress = createAsyncThunk("ingress", async (datos) => {
  try {
    const res = await axios.post(`${API}auth/signin`, datos);

    if (res.data.success) {
      return {
        success: true,
        response: res.data.response,
      };
    } else {
      return {
        success: false,
        response: res.data.message,
      };
    }
  } catch (error) {
    console.log(error.message);
  }
});

const reIngress = createAsyncThunk("reIngress", async (token) => {
  let url = `${API}auth/token`;

  let headers = { headers: { Authorization: `Bearer ${token}` } };
  try {
    let user = await axios.post(url, null, headers);
    
    return {
      success: true,
      response: {
        user: user.data.response,
        token,
      },
    };
  } catch (error) {
    return {
      success: false,
      response: error.response.data.message,
    };
  }
});

const logout = createAsyncThunk("logout", async (token) => {
  let url = `${API}auth/signout`;
  let headers = { headers: { Authorization: `Bearer ${token}` } };

  try {
    let user = await axios.post(url, null, headers);

    return {
      success: true,
      response: user.data.message,
    };
  } catch (error) {
    return {
      success: false,
      response: error.response.data.message,
    };
  }
});
const editUser = createAsyncThunk("editUser", async ({ token, data }) => {
  let url = `${API}auth/me`;
  let headers = { headers: { Authorization: `Bearer ${token}` } };
  
  try {
    let res = await axios.patch(url, data, headers);

    if (res.data.id) {
      return {
        responseId: res.data.id,
        success: true,
        response: data,
      };
    } else {
      return {
        success: false,
        response: res.data.message,
      };
    }
  } catch (error) {
    return {
      success: false,
      response: "error",
    };
  }
});

const getDatos = createAsyncThunk("getDatos", async ({token}) => {

  let headers = { headers: { Authorization: `Bearer ${token}` } };

  try {
    let res = await axios.get(`${API}auth/me`, headers);
    
    return {
      success: true,
      response: res.data.response,
    };
  } catch (error) {

    return {
      
      success: false,
      response: "error",
    };
  }
});

const agregarAcarro = createAsyncThunk(
  "agregarAcarro",
  async ({ token, carrito }) => {
    let url = `${API}auth/me`;
    let headers = { headers: { Authorization: `Bearer ${token}` } };

    try {
      let res = await axios.patch(url, {products: carrito}, headers);
      
      return {
        success: true,
        response: res.data.response.products,
      };
    } catch (error) {
      return {
        success: false,
        response: error.message,
      };
    }
  }
);

const agregarAfavoritos = createAsyncThunk(
  "agregarAfavoritos",
  async ({ token, favoritos }) => {
    let url = `${API}auth/me`;
    let headers = { headers: { Authorization: `Bearer ${token}` } };
    
    try {
      let res = await axios.patch(url, {favorites: favoritos}, headers);
      console.log(res);
      return {
        success: true,
        response: res.data.response.favorites,
      };
    } catch (error) {
      return {
        success: false,
        response: error.message,
      };
    }
  }
);


const userActions = {
  ingress,
  reIngress,
  logout,
  editUser,
  getDatos,
  agregarAcarro,
  agregarAfavoritos,
};

export default userActions;
