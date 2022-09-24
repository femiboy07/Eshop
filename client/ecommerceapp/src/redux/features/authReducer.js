import { createSlice } from '@reduxjs/toolkit';
// import { RootState } from '../store';
import { useSelector } from 'react-redux';

const isAuthSlice = createSlice({
    name: 'auth',
    initialState: { name: null, token: null, userId: null },
    reducers: {
        setUser: (state, { payload: { name, token, userId } }) => {
            localStorage.setItem('users', JSON.stringify({
                name: name,
                token: token,
                userId: userId
            }))
            state.name = name;
            state.token = token;
            state.userId = userId;

        },
        logOut: (state, action) => {
            localStorage.clear();
            state.name = null;
            state.token = null;
            state.userId = null;
        }
    }
})

// export const selectCurrentUser = RootState.auth.name;
export const { setUser, logOut } = isAuthSlice.actions;
export default isAuthSlice.reducer;