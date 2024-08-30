import {createSlice, PayloadAction} from "@reduxjs/toolkit"

interface User{
    id: string,
    role: "owner" | "manager" | "employee" | "admin",
    organization: string
}

interface AuthState{
    user: User | null;
    accessToken: string | null;
    isInitialSetup: boolean;
    isAuthenticated: boolean;
    // isBlocked: boolean
}

const initialState: AuthState = {
    user: null,
    accessToken: null,
    isInitialSetup: false,
    isAuthenticated: false,
    // isBlocked: false,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        setCredentials: (state, action: PayloadAction<{user: any, accessToken: string, isInitialSetup?: boolean}>) =>{
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.isInitialSetup = action.payload.isInitialSetup || false;
            state.isAuthenticated = true;
        },
        // updateUserStatus: (state, action: PayloadAction<{ isBlocked: boolean }>)=>{
        //     state.isBlocked = action.payload.isBlocked;
        // },
        clearCredentials: (state) =>{
            state.user = null;
            state.accessToken = null;
            state.isAuthenticated = false;
        }
    }
});

export const { setCredentials,  clearCredentials} = authSlice.actions;
export default authSlice.reducer;