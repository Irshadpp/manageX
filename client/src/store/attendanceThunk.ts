import { apiRequest } from "@/services/api/commonRequest";
import { AppDispatch } from ".";
import {
  fetchAttendanceRequest,
  fetchAttendanceSuccess,
  fetchAttendanceFailure,
  createAttendanceRequest,
  createAttendanceSuccess,
  createAttendanceFailure,
} from "./attendanceSlice";

export const fetchAttendance = () => async (dispatch: AppDispatch) => {
  dispatch(fetchAttendanceRequest());
  try {
    const response: any = await apiRequest({
      method: "GET",
      url: import.meta.env.VITE_EMPLOYEE_URL,
      route: "/api/v1/attendance",
      headers: {
        "Content-type": "application/json"
      }
    });
    dispatch(fetchAttendanceSuccess(response.data));
  } catch (error: any) {
    dispatch(fetchAttendanceFailure(error.message));
  }
};

export const createAttendance = (attendance: any) => async (dispatch: AppDispatch) => {
  dispatch(createAttendanceRequest());
  try {
    const response: any = await apiRequest({
      method: "POST",
      url: import.meta.env.VITE_EMPLOYEE_URL,
      route: "/api/v1/attendance",
      data: attendance,
      headers: {
        "Content-type": "application/json"
      }
    });
    if (response.errors && response.errors.length > 0) {
      const errorMessage = response.errors[0].message;
      dispatch(createAttendanceFailure(errorMessage));
    } else {
      dispatch(createAttendanceSuccess(response.data));
    }
  } catch (error: any) {
    dispatch(createAttendanceFailure(error.message || "Something went wrong"));
  }
};
