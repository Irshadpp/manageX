import { apiRequest } from "@/services/api/commonRequest";
import { AppDispatch } from ".";
import { createTaskFailure, createTaskRequest, createTaskSuccess, fetchTaskFailure, fetchTaskRequest, fetchTaskSuccess, updateTaskFailure, updateTaskRequest, updateTaskSuccess } from "./taskSlice";

export const fetchTask = () => async (dispatch: AppDispatch) => {
  dispatch(fetchTaskRequest());
  try {
    const response: any = await apiRequest({
      method: "GET",
      url: import.meta.env.VITE_PROJECT_URL,
      route: `/api/v1/task`,
      headers: {
        "Content-type": "application/json"
      }
    });
    dispatch(fetchTaskSuccess(response.data));
  } catch (error: any) {
    dispatch(fetchTaskFailure(error.message));
  }
};

export const createTask= (task: any) => async (dispatch: AppDispatch) => {
  dispatch(createTaskRequest());
  try {
    const response: any = await apiRequest({
      method: "POST",
      url: import.meta.env.VITE_PROJECT_URL,
      route: `/api/v1/task`,
      data: task,
      headers: {
        "Content-type": "application/json"
      }
    });
    if (response.errors && response.errors.length > 0) {
      const errorMessage = response.errors[0].message;
      dispatch(createTaskFailure(errorMessage));
    } else {
      dispatch(createTaskRequest(response.data));
    }
  } catch (error: any) {
    dispatch(createTaskFailure(error.message || "Something went wrong"));
    return Promise.reject(error.message); 
  }
};

export const updateTask= (task: any, id: string) => async (dispatch: AppDispatch) => {
    dispatch(updateTaskRequest());
    try {
      const response: any = await apiRequest({
        method: "PATCH",
        url: import.meta.env.VITE_PROJECT_URL,
        route: `/api/v1/task/${id}`,
        data: task,
        headers: {
          "Content-type": "application/json"
        }
      });
      if (response.errors && response.errors.length > 0) {
        const errorMessage = response.errors[0].message;
        dispatch(updateTaskFailure(errorMessage));
      } else {
        dispatch(updateTaskSuccess(response.data));
      }
    } catch (error: any) {
      dispatch(updateTaskFailure(error.message || "Something went wrong"));
      return Promise.reject(error.message); 
    }
  };
