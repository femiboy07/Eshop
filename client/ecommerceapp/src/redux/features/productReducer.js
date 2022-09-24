import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axios from "axios";




// const productSlice = createSlice({
//     name: 'products',
//     // initialState: {
//     //     store: [],
//     //     page: 1,
//     //     status: 'idle',
//     //     error: false
//     // },
//     reducers: {},


//     // extraReducers(builders) {
//     //     builders.addCase(fetchProducts.pending, (state, action) => {
//     //         state.status = 'loading';
//     //     }).addCase(fetchProducts.fulfilled, (state, action) => {
//     //         state.status = 'succeded';
//     //         state.store = action.payload;
//     //         state.page = action.payload;

//     //     }).addCase(fetchProducts.rejected, (state, action) => {
//     //         state.status = 'failed';
//     //         state.error = action.error.message;

//     //     })
//     // }


// })



// export default productSlice.reducer;