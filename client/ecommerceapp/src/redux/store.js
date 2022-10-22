import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./features/userReducer";
import cartSlice from "./features/cartSlice";
import { apiSlice } from "./features/api/apiSlice";
import { authSlice } from "./features/api/apiSlice";
import { cartSlices } from "./features/api/apiSlice";
import authReducer from "./features/authReducer";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';



const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    // blacklist: [cartSlices.reducerPath]
}

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartSlice,
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [authSlice.reducerPath]: authSlice.reducer,
    [cartSlices.reducerPath]: cartSlices.reducer
});
const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
        reducer: persistedReducer,

        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            }
        }).concat([apiSlice.middleware, authSlice.middleware, cartSlices.middleware]),
        


    })

export let persistor = persistStore(store);
export const RootState = store.getState();