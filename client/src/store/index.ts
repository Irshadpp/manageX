import { Action, combineReducers, configureStore, ThunkAction } from "@reduxjs/toolkit";
import authReducer, { rehydrateAuthState, setCredentials } from "./authSlice"
import employeeReducer from "./employeeSlice"
import { getObject } from "@/utils/local-storage";
import storage from "redux-persist/lib/storage"; 
import {persistReducer, } from "redux-persist"
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ['auth','employee']
}

const rootReducer = combineReducers({
    auth: authReducer,
    employee: employeeReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            // Ignore redux-persist actions
            ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
          },
        }),
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

export const persistor = persistStore(store);
export default store;