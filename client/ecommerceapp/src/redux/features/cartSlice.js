import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiSlice, authSlice, cartSlices } from './api/apiSlice';
import axios from 'axios';


const baseUrl = `http://localhost:5000/api/cart/`;

export const updateCarts = createAsyncThunk('cart/updateCarts', async({ userId, ...initialPost }) => {
    const response = await axios.put(`${baseUrl}${userId}`, initialPost);
    return response.data;
})

export const deleteCart = createAsyncThunk(`cart/deleteCart`, async({ userId, productId }) => {
    const response = await axios.delete(`${baseUrl}${userId}/${productId}`);
    return response.data;
})



const cartSlice = createSlice({
    name: 'cart',
    initialState: { carts: null, isLoading: false, error: '' },
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
        })
        builder.addMatcher(
            cartSlices.endpoints.addToCart.matchFulfilled, (state, action) => {
                localStorage.setItem('cart', JSON.stringify({
                    carts: action.payload.carts
                }))
                state.carts = action.payload;
            },



            cartSlices.endpoints.getCart.matchFulfilled, (state, action) => {
                state.carts = action.payload;
            }

        )



    }


})



export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;