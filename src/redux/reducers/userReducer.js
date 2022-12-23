import { createReducer } from "@reduxjs/toolkit";
import userActions from "../actions/userActions";
const { ingress, reIngress, logout, getDatos, agregarAcarro, editUser, agregarAfavoritos } =
  userActions;

const initialState = {
  nombre: "",
  apellido: "",
  dni: null,
  direccion: "",
  rol: "",
  foto: "",
  edad: null,
  email: "",
  logged: false,
  carrito: [],
  favoritos: [],
  date: "",
  token: "",
  id: "",
  nick:'',
  cp:'',
  monedas: "",
  nombreDni:'',
  aprove:false
};

const userReducer = createReducer(initialState, (builder) => {
  builder.addCase(ingress.fulfilled, (state, action) => {
    const { success, response } = action.payload;

    if (success) {
      let { user, token } = response;
      localStorage.setItem("token", JSON.stringify({ token: { user: token } }));

      let newState = {
        ...state,
        nombre: user.name,
        apellido: user.lastName,
        dni: user.dni,
        direccion: user.adress,
        rol: user.role,
        foto: user.photo,
        edad: user.age,
        email: user.email,
        date: user.date,
        logged: true,
        carrito: user.products,
        favoritos: user.favorites,
        token: token,
        nick:user.nick,
        monedas: user.coins,
        phone:user.phone,
        nombreDni:user.nameDni,
        cp:user.cp,
        aprove: user.aprove
      };
      return newState;
    } else {
      let newState = {
        ...state,
        message: response,
      };
      return newState;
    }
  });

  builder.addCase(reIngress.fulfilled, (state, action) => {
    const { success, response } = action.payload;

    if (success) {
      let { user, token } = response;
      
      let newState = {
        ...state,
        nombre: user.name,
        apellido: user.lastName,
        date: user.date,
        dni: user.dni,
        email: user.email,
        direccion: user.adress,
        foto: user.photo,
        logged: true,
        rol: user.role,
        foto: user.photo,
        edad: user.age,
        email: user.email,
        carrito: user.products,
        favoritos: user.favorites,
        token: token,
        monedas: user.coins,
        nick:user.nick,
        phone:user.phone,
        nombreDni:user.nameDni,
        cp:user.cp,
        aprove: user.aprove
      };
      return newState;
    } else {
      let newState = {
        ...state,
        message: response,
      };
      return newState;
    }
  });

  builder.addCase(logout.fulfilled, (state, action) => {
    const { success, response } = action.payload;
    if (success) {
      localStorage.removeItem("token");
      let newState = {
        ...state,
        nombre: "",
        apellido: "",
        date: "",
        dni: "",
        email: "",
        direccion: "",
        foto: "",
        logged: false,
        token: "",
        rol: "",
        monedas: "",
        foto: "",
        edad: "",
        email: "",
        carrito: [],
        favoritos: [],
      };
      return newState;
    } else {
      let newState = {
        ...state,
        message: response,
      };
      return newState;
    }
  });

  builder.addCase(editUser.fulfilled, (state, action) => {
    console.log(action.payload)
    return {
      ...state,
      id: action.payload.id,
      /* aprove:action.payload.response.aprove */
    };
  });

  builder.addCase(getDatos.fulfilled, (state, action) => {
    const { success, response } = action.payload;

    if (success) {
      let newState = {
        ...state,
        carrito: response.products,
        favoritos: response.favorites,
        monedas: response.coins,
        aprove: response.aprove
      };
      return newState;
    } else {
      let newState = {
        ...state,
        message: response,
      };
      return newState;
    }
  });

  builder.addCase(agregarAcarro.fulfilled, (state, action) => {
    const { success, response } = action.payload;
    if (success) {
      let newState = {
        ...state,
        carrito: response,
      };
      return newState;
    } else {
      let newState = {
        ...state,
        message: response,
      };
      return newState;
    }
  });

  builder.addCase(agregarAfavoritos.fulfilled, (state, action) => {
    const { success, response } = action.payload;

    if (success) {
      let newState = {
        ...state,
        favoritos: response,
      };
      return newState;
    } else {
      let newState = {
        ...state,
        message: response,
      };
      return newState;
    }
  });
  
});

export default userReducer;
