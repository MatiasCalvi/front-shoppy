import { createAsyncThunk,createAction} from "@reduxjs/toolkit";
import axios from "axios";
import API from "../../config/api";

const mercadoPago = createAsyncThunk("mercadoPago", async (preference) => {
    
    const url=`${API}payment`
    
  try {
    const res = await axios.post(url,preference);
    console.log(res)
    return{
        response: res.data,
        success: true
    } 
  } catch (error) {
    console.log(error.response.data);
  }
});
const actualizarPrecio = createAction("actualizarPrecio", (aprove) => {
    
  return{
      payload:aprove
  }
  
});



const paymentActions = { mercadoPago,actualizarPrecio};

export default paymentActions;
