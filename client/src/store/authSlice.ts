import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import { deleteObject, storeObject } from "@/utils/local-storage";

interface User{
    id: string,
    role: "owner" | "manager" | "employee" | "admin",
    organization: string
}

interface AuthState{
    user: User | null;
    isInitialSetup: boolean;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    user: null,
    isInitialSetup: false,
    isAuthenticated: false,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        setCredentials: (state, action: PayloadAction<{user: any}>) =>{
            state.isAuthenticated = true;
            state.user = action.payload.user;
            storeObject("userData", state.user)
        },
        rehydrateAuthState: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload;
            state.isAuthenticated = action.payload !== null;
            
        },
        updateIntitialSetup: (state,  action: PayloadAction<{value: boolean}>) =>{
            state.isInitialSetup = action.payload.value;
        },
        clearCredentials: (state) =>{
            state.user = null;
            state.isAuthenticated = false;
            deleteObject("userData")
        }
    }
});

export const { setCredentials, rehydrateAuthState, updateIntitialSetup, clearCredentials} = authSlice.actions;

export default authSlice.reducer;