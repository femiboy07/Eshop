import { createSlice } from '@reduxjs/toolkit';
// import { RootState } from '../store';


const isAuthSlice = createSlice({
    name: 'auth',
    initialState: { name: null, token: null, userId: null,carts :null},
    reducers: {
        setUser: (state, { payload: { name, token, userId,carts } }) => {
            localStorage.setItem('users', JSON.stringify({
                name: name,
                token: token,
                userId: userId,
                carts:carts,
                
            }))
            state.name = name;
            state.token = token;
            state.userId = userId;
            state.carts=carts;
        },
        logOut: (state, action) => {
            localStorage.clear();
            state.name = null;
            state.token = null;
            state.userId = null;
            state.carts=null;
           
        }
    }
})

// export const selectCurrentUser = RootState.auth.name;
export const { setUser, logOut } = isAuthSlice.actions;
export default isAuthSlice.reducer;