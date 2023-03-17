import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API from "../../config/api";

const productos = createAsyncThunk("productos", async () => {
  try {
    const res = await axios.get(`${API}product`);
    const productosFiltrado = res.data.response.filter(
      (producto) => producto.stock !== 0
    );

    if (res.data.success) {
      return {
        success: true,
        response: productosFiltrado,
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

const productosFiltrados = createAsyncThunk(
  "productosFiltrados",
  async ({ peticion }) => {
    try {
      const res = await axios.get(`${API}product/${peticion}`);
      const productosConStock = res.data.response.filter(
        (producto) => producto.stock !== 0
      );

      if (res.data.success) {
        return {
          success: true,
          response: productosConStock,
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
  }
);

const nuevoProducto = createAsyncThunk(
  "nuevoProducto",
  async ({ token, producto }) => {
    let headers = { headers: { Authorization: `Bearer ${token}` } };

    try {
      let res = await axios.post(`${API}product/`, producto, headers);

      if (res.data.success) {
        return {
          success: true,
          response: res.data.response,
        };
      } else {
        return {
          success: false,
          error: res.data.message,
        };
      }
    } catch (error) {
      return {
        success: false,
        response: "error",
      };
    }
  }
);

const editarProducto = createAsyncThunk(
  "editarProducto",
  async ({ token, producto, id }) => {
    let headers = { headers: { Authorization: `Bearer ${token}` } };

    try {
      let res = await axios.put(`${API}product/${id}`, producto, headers);

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
  }
);

const eliminarProducto = createAsyncThunk(
  "eliminarProducto",
  async ({ token, id }) => {
    let headers = { headers: { Authorization: `Bearer ${token}` } };

    try {
      let res = await axios.delete(`${API}product/${id}`, headers);
      console.log(res.data.response);
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
  }
);

const productsActions = {
  productos,
  productosFiltrados,
  nuevoProducto,
  editarProducto,
  eliminarProducto,
};

export default productsActions;
