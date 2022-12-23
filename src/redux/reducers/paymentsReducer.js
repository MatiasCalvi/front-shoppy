import { createReducer } from "@reduxjs/toolkit";
import paymentActions from "../actions/paymentActions";
const { actualizarPrecio } =
paymentActions;

const initialState = {
    aprove: false
};
const paymentsReducer = createReducer(initialState, (builder) => {
    builder.addCase(actualizarPrecio, (state, action) => {
        console.log(action.payload)
        /* return{
          ...state,
          aprove:action.payload
        } */
  });
})

export default paymentsReducer;