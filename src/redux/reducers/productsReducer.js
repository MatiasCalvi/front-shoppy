import { createReducer } from "@reduxjs/toolkit";
import productsActions from "../actions/productsActions";
const {
  productos,
  productosFiltrados,
  nuevoProducto,
  editarProducto,
  eliminarProducto,
  fotoCargada
} = productsActions;

const initialState = {
  TodosLosproductos: [],
  productosFiltradosArray: [],
  refresh: false,
};

const productsReducer = createReducer(initialState, (builder) => {
  builder.addCase(productos.fulfilled, (state, action) => {
    const { success, response } = action.payload;

    if (success) {
      return {
        ...state,
        TodosLosproductos: response,
      };
    } else {
      let newState = {
        ...state,
        message: response,
      };
      return newState;
    }
  });

  builder.addCase(productosFiltrados.fulfilled, (state, action) => {
    const { success, response } = action.payload;

    if (success) {
      return {
        ...state,
        productosFiltradosArray: response,
      };
    } else {
      let newState = {
        ...state,
        message: response,
      };
      return newState;
    }
  });

  builder.addCase(nuevoProducto.fulfilled, (state, action) => {
    const { success, response } = action.payload;

    if (success) {
      let newState = state.TodosLosproductos.concat(response);

      return {
        ...state,
        newState,
        refresh: !state.refresh,
      };
    } else {
      let newState = {
        ...state,
        message: response,
      };
      return newState;
    }
  });

  builder.addCase(editarProducto.fulfilled, (state, action) => {
    const { success, response } = action.payload;

    if (success) {
      let newState = state.TodosLosproductos.filter(
        (x) => x._id !== response._id
      ).concat(response);

      return {
        ...state,
        refresh: !state.refresh,
        newState,
      };
    } else {
      let newState = {
        ...state,

        message: response,
      };
      return newState;
    }
  });

  builder.addCase(eliminarProducto.fulfilled, (state, action) => {
    const { success, response } = action.payload;

    if (action.payload.success) {
      let newState = state.TodosLosproductos.filter(
        (x) => x._id !== response._id
      );

      return {
        ...state,
        refresh: !state.refresh,
        newState,
      };
    } else {
      let newState = {
        ...state,
        message: response,
      };
      return newState;
    }
  });

  
});

export default productsReducer;
