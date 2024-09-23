import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import { AppThunk } from ".";
import { apiRequest } from "@/services/api/commonRequest";
import { deleteObject, storeObject } from "@/utils/local-storage";
import { boolean } from "zod";

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

// export const checkAuthStatus = (): AppThunk => async (dispatch) =>{
//     try {
//         const response = await apiRequest({
//             method: "GET",
//             url: import.meta.env.VITE_USERS_URL,
//             route:`/api/v1/auth/check-user`,
//             headers:{
//                 "Content-Type":"application/json"
//             }
//         });
//         if(response.status === 200){
//             dispatch(setCredentials({user: response.user}));
//         }else{
//             dispatch(clearCredentials());
//         }
//     } catch (error) {
//         console.log(error)
//         dispatch(clearCredentials())
//     }
// }

export default authSlice.reducer;