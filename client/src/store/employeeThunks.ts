import { apiRequest } from "@/services/api/commonRequest";
import { AppDispatch } from ".";
import { fetchEmployeeFailure, fetchEmployeesRequest, fetchEmployeesSuccess } from "./employeeSlice";


export const fetchEmployees = () => async (dispatch: AppDispatch) =>{
    dispatch(fetchEmployeesRequest());
    try {
        const response: any = await apiRequest({
            method: "GET",
            url: import.meta.env.VITE_EMPLOYEE_URL,
            route: "/api/v1/employee",
            headers: {
                "Content-type": "application/json"
            }
        });
        console.log("Response received:", response);
        dispatch(fetchEmployeesSuccess(response.data));
    } catch (error: any) {
        console.error("Fetch employees error:", error);
        dispatch(fetchEmployeeFailure(error.message));
    }
}



