import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Employee, EmployeeApiData, initialState } from "./types/employee";


const employeeSlice = createSlice({
    name: "employee",
    initialState: initialState,
    reducers:{
        fetchEmployeesRequest(state){
            state.loading = true;
        },
        fetchEmployeesSuccess(state, action: PayloadAction<EmployeeApiData>){
            state.employees = action.payload.employees
            state.totalPages = action.payload.totalPages
            state.loading = false;  
            state.error = null;
            state.shouldRefetch = false;
        },
        fetchEmployeeFailure(state, action: PayloadAction<string>){
            state.loading = false;
            state.error = action.payload;
        },
    }
});

export const {
    fetchEmployeesRequest,
    fetchEmployeesSuccess,
    fetchEmployeeFailure,
} = employeeSlice.actions;

export default employeeSlice.reducer;