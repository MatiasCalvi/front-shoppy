import { createReducer } from "@reduxjs/toolkit";
import userActions from "../actions/userActions";
const { ingress, reIngress, logout, getDatos, editProfile } = userActions;

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
        apellido: user.lname,
        dni: user.dni,
        direccion: user.adress,
        rol: user.rol,
        foto: user.photo,
        edad: null,
        email: user.email,
        logged: true,
        carrito: user.products,
        favoritos: user.favorites,
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
