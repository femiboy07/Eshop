import { createSlice } from '@reduxjs/toolkit';





const userSlice = createSlice({

    name: 'user',
    initialState: {
        fullBox: false,
        userInfo: null,

        cart: {
            shippingAddress: {
                location: {}
            },
            paymentMethod: '',

        },



    },
    reducers: {

        userSignIn: (state, action) => {
            state.userInfo = action.payload;
        },
        userSignOut: (state, action) => {
            state.userInfo = null;

            state.cart.shippingAddress = {};
            state.cart.paymentMethod = '';

        },
        saveShippingAddress: (state, action) => {
            state.cart.shippingAddress.location = action.payload;

        },

        savePaymentMethod: (state, action) => {
            state.cart.paymentMethod = action.payload;
        }


    }

})

export const {
    saveShippingAddress,
    userSignOut,
    userSignIn,
    cartAddItem,
    cartClear,
    cartRemoveItem,
    setFullBoxOff,
    setFullBoxOn,
    savePaymentMethod
} = userSlice.actions;
export default userSlice.reducer;