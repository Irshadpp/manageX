import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import authReducer, { rehydrateAuthState, setCredentials } from "./authSlice"
import employeeReducer from "./employeeSlice"
import { getObject } from "@/utils/local-storage";

const store = configureStore({
    reducer:{
        auth: authReducer,
        employee: employeeReducer
    },
});

const userData = getObject("userData");
if (userData) {
    store.dispatch(rehydrateAuthState(userData));
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>;

export default store;