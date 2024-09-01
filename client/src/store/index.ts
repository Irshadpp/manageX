import { configureStore } from "@reduxjs/toolkit";
import authReducer, { setCredentials } from "./authSlice"
import { getObject } from "@/utils/local-storage";

const store = configureStore({
    reducer:{
        auth: authReducer
    }
});

const userData = getObject("userData");
if(userData){
    store.dispatch(setCredentials(userData));
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;