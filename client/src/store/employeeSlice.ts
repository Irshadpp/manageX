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
        terminateEmployeeRequest(state){
            state.loading = true;
        },
        terminateEmployeeSuccess(state, action: PayloadAction<any>){
            state.exEmployees = [...state.exEmployees, action.payload]
            state.employees = state.employees.filter((e) => e.id !== action.payload.id);
        },
        terminateEmployeeFailure(state, action: PayloadAction<string>){
            state.error = action.payload;
            state.loading = false;
        },
    }
});

export const {
    fetchEmployeesRequest,
    fetchEmployeesSuccess,
    fetchEmployeeFailure,
    terminateEmployeeRequest,
    terminateEmployeeSuccess,
    terminateEmployeeFailure
} = employeeSlice.actions;

export default employeeSlice.reducer;