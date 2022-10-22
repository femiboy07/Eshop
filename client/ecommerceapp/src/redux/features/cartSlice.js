import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {  cartSlices } from './api/apiSlice';
import axios from 'axios';


const baseUrl = `http://localhost:5000/api/cart/`;

export const updateCarts = createAsyncThunk('cart/updateCarts', async({ userId, ...initialPost},{dispatch, getState,rejectWithValue}) => {
   
    
        const token = getState().auth.token;
        const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        const response = await axios.put(`${baseUrl}${userId}`, initialPost,config);
        return response.data;
    
    
    
    
})




export const deleteCart = createAsyncThunk(`cart/deleteCart`, async({ userId, productId},{getState}) => {
    const token = getState().auth.token;
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    const response = await axios.delete(`${baseUrl}${userId}/${productId}`,config);
    return response.data;
})

export const getCart=createAsyncThunk('cart/getCart',async({userId},{getState})=>{
    const token = getState().auth.token;
    
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    const response = await axios.get(`${baseUrl}${userId}`,config);
    return response.data;
})



const cartSlice = createSlice({
    name: 'cart',
    initialState: { carts: null, isLoading: false, error: '' ,status:'idle'},
    reducers: {

        clearCart(state, action) {
            state.carts = null;

        },

    },

    extraReducers(builder) {



        builder.addCase(updateCarts.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(updateCarts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.carts = action.payload;

        }).addCase(updateCarts.rejected, (state, action) => {
            state.error = action.payload
            state.isLoading = false;

        }).addCase(deleteCart.pending, (state) => {
            state.isLoading = true;
        }).addCase(deleteCart.fulfilled, (state, action) => {
            state.carts = action.payload;
            state.isLoading = false;
        }).addCase(deleteCart.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }).addCase(getCart.pending, (state, action) => {
            
            state.status = 'loading';
        }).addCase(getCart.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.carts=action.payload;
        }).addCase(getCart.rejected, (state, action) => {
            state.error=action.payload;
            state.status = 'failed';
        })
        builder.addMatcher(
            cartSlices.endpoints.addToCart.matchFulfilled, (state, action) => {
                localStorage.setItem('cart', JSON.stringify({
                    carts: action.payload.carts
                }))
                state.carts = action.payload;
            },

        ).addMatcher(
            cartSlices.endpoints.getCart.matchFulfilled, (state, action) => {
                state.carts = action.payload;
            }
        )
        



    }


})



export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;