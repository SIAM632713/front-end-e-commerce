import authAPI from "../feature/auth/authAPI.js";
import { configureStore } from '@reduxjs/toolkit'
import authReducer from "../feature/auth/authSlice.jsx";
import productAPI from "../feature/Product/productAPI.js";
import reviewAPI from "../feature/Reviews/ReviewAPI.js";
import cartReducer from "../feature/Cart/cartSlice.js";
import orderAPI from "../feature/Order/orderAPI.js";
import stateAPI from "../feature/State/stateAPI.js";

export const store=configureStore({
    reducer:{
        [authAPI.reducerPath] : authAPI.reducer,
        auth:authReducer,
        cart:cartReducer,
        [productAPI.reducerPath] : productAPI.reducer,
        [reviewAPI.reducerPath] : reviewAPI.reducer,
        [orderAPI.reducerPath]:orderAPI.reducer,
        [stateAPI.reducerPath]:stateAPI.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authAPI.middleware,productAPI.middleware,reviewAPI.middleware,stateAPI.middleware,orderAPI.middleware),
})