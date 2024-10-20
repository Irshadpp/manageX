import { apiRequest } from "@/services/api/commonRequest";
import { AppDispatch } from ".";
import { createProjectFailure, createProjectRequest, createProjectSuccess, fetchProjectFailure, fetchProjectRequest, fetchProjectSuccess, updateProjectFailure, updateProjectRequest, updateProjectSuccess } from "./projectSlice";

export const fetchProject = () => async (dispatch: AppDispatch) => {
  dispatch(fetchProjectRequest());
  try {
    const response: any = await apiRequest({
      method: "GET",
      url: import.meta.env.VITE_BACKEND_URL,
      route: `/api/v1/project`,
      headers: {
        "Content-type": "application/json"
      }
    });
    dispatch(fetchProjectSuccess(response.data));
  } catch (error: any) {
    dispatch(fetchProjectFailure(error.message));
  }
};

export const createProject = (project: any) => async (dispatch: AppDispatch) => {
  dispatch(createProjectRequest());
  try {
    const response: any = await apiRequest({
      method: "POST",
      url: import.meta.env.VITE_BACKEND_URL,
      route: `/api/v1/project`,
      data: project,
      headers: {
        "Content-type": "application/json"
      }
    });
    if (response.errors && response.errors.length > 0) {
      const errorMessage = response.errors[0].message;
      dispatch(createProjectFailure(errorMessage));
    } else {
      dispatch(createProjectSuccess(response.data));
      return {success: true}
    }
  } catch (error: any) {
    dispatch(createProjectFailure(error.message || "Something went wrong"));
    return Promise.reject(error.message); 
  }
};

export const updateProject = (project: any, id: string) => async (dispatch: AppDispatch) => {
    dispatch(updateProjectRequest());
    try {
      const response: any = await apiRequest({
        method: "PATCH",
        url: import.meta.env.VITE_BACKEND_URL,
        route: `/api/v1/project/${id}`,
        data: project,
        headers: {
          "Content-type": "application/json"
        }
      });
      if (response.errors && response.errors.length > 0) {
        const errorMessage = response.errors[0].message;
        dispatch(updateProjectFailure(errorMessage));
      } else {
        dispatch(updateProjectSuccess(response.data));
        return {success: true}
      }
    } catch (error: any) {
      dispatch(updateProjectFailure(error.message || "Something went wrong"));
      return Promise.reject(error.message); 
    }
  };
