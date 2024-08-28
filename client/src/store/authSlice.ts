import {createSlice, PayloadAction} from "@reduxjs/toolkit"

interface User{
    id: string,
    role: "owner" | "manager" | "employee" | "admin",
    organization: string
}

interface AuthState{
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    isInitialSetup: boolean;
    isAuthenticated: boolean;
    isBlocked: boolean
}

const initialState: AuthState = {
    user: null,
    accessToken: null,
    refreshToken: null,
    isInitialSetup: false,
    isAuthenticated: false,
    isBlocked: false,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        setCredentials: (state, action: PayloadAction<{user: any, accessToken: string, refreshToken: string, isInitialSetup?: boolean}>) =>{
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.isInitialSetup = action.payload.isInitialSetup || false;
            state.isAuthenticated = true;
        },
        updateUserStatus: (state, action: PayloadAction<{ isBlocked: boolean }>)=>{
            state.isBlocked = action.payload.isBlocked;
        },
        clearCredentials: (state) =>{
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
            state.isAuthenticated = false;
        }
    }
});

export const { setCredentials, updateUserStatus,  clearCredentials} = authSlice.actions;
export default authSlice.reducer;