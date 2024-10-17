import { apiRequest } from "@/services/api/commonRequest";
import { AppDispatch } from ".";
import { fetchEmployeeFailure, fetchEmployeesRequest, fetchEmployeesSuccess } from "./employeeSlice";


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



