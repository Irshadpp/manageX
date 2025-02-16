import { apiRequest } from "@/services/api/commonRequest";
import { AppDispatch } from ".";
import { fetchEmployeeFailure, fetchEmployeesRequest, fetchEmployeesSuccess, terminateEmployeeFailure, terminateEmployeeRequest, terminateEmployeeSuccess } from "./employeeSlice";


export const fetchEmployees = (page=1, limit=8) => async (dispatch: AppDispatch) =>{
    dispatch(fetchEmployeesRequest());
    try {
        const response: any = await apiRequest({
            method: "GET",
            url: import.meta.env.VITE_EMPLOYEE_URL,
            route: `/api/v1/employee?page=${page}&limit=${limit}`,
            headers: {
                "Content-type": "application/json"
            }
        });
        console.log(response.data)
        dispatch(fetchEmployeesSuccess(response.data));
    } catch (error: any) {
        console.error("Fetch employees error:", error);
        dispatch(fetchEmployeeFailure(error.message));
    }
}

export const terminateEmployee = (values: any, id: string) => async (dispatch: AppDispatch) =>{
    dispatch(terminateEmployeeRequest())
    try {
        const response: any = await apiRequest({
            method: "PATCH",
            url: import.meta.env.VITE_EMPLOYEE_URL,
            route: `/api/v1/employee/terminate/${id}`,
            headers: {
                "Content-type": "application/json"
            },
            data: values
        });
        console.log(response.data)
        dispatch(terminateEmployeeSuccess(response.data));
    } catch (error: any) {
        console.error("Fetch employees error:", error);
        dispatch(terminateEmployeeFailure(error.message));
    }
}


