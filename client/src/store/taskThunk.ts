import { apiRequest } from "@/services/api/commonRequest";
import { AppDispatch } from ".";
import { createTaskFailure, createTaskRequest, createTaskSuccess, fetchTaskFailure, fetchTaskRequest, fetchTaskSuccess, updateTaskFailure, updateTaskRequest, updateTaskSuccess } from "./taskSlice";

export const fetchTasks = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(fetchTaskRequest());
  try {
    const response: any = await apiRequest({
      method: "GET",
      url: import.meta.env.VITE_PROJECT_URL,
      route: `/api/v1/task/${id}`,
      headers: {
        "Content-type": "application/json"
      }
    });
    dispatch(fetchTaskSuccess(response.data));
  } catch (error: any) {
    dispatch(fetchTaskFailure(error.message));
  }
};

export const createTask= (task: any, id: string) => async (dispatch: AppDispatch) => {
  dispatch(createTaskRequest());
  try {
    const response: any = await apiRequest({
      method: "POST",
      url: import.meta.env.VITE_PROJECT_URL,
      route: `/api/v1/task/${id}`,
      data: task,
      headers: {
        "Content-type": "application/json"
      }
    });
    if (response.errors && response.errors.length > 0) {
      const errorMessage = response.errors[0].message;
      dispatch(createTaskFailure(errorMessage));
    } else {
      dispatch(createTaskSuccess(response.data));
      return {success: true}
    }
  } catch (error: any) {
    dispatch(createTaskFailure(error.message || "Something went wrong"));
    return Promise.reject(error.message); 
  }
};

export const updateTask= (task: any, id: string, isComment?: boolean) => async (dispatch: AppDispatch) => {
    dispatch(updateTaskRequest());
    console.log("task======>",task)
    try {
      const comment = isComment ? true : false
      console.log(comment)
      const response: any = await apiRequest({
        method: "PATCH",
        url: import.meta.env.VITE_PROJECT_URL,
        route: `/api/v1/task/${id}?comment=${comment}`,
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
        return {success: true}
      }
    } catch (error: any) {
      dispatch(updateTaskFailure(error.message || "Something went wrong"));
      return Promise.reject(error.message); 
    }
  };

  export const replyToComment = (taskId: string, commentId: string, reply: any) => async (dispatch: AppDispatch) => {
    dispatch(updateTaskRequest());
    try {
      const response: any = await apiRequest({
        method: "PATCH",
        url: import.meta.env.VITE_PROJECT_URL,
        route: `/api/v1/task/${taskId}/comments/reply?id=${commentId}`,
        data: reply,
        headers: {
          "Content-type": "application/json"
        }
      });
      if (response.errors && response.errors.length > 0) {
        const errorMessage = response.errors[0].message;
        dispatch(updateTaskFailure(errorMessage));
      } else {
        dispatch(updateTaskSuccess(response.data));
        return { success: true };
      }
    } catch (error: any) {
      dispatch(updateTaskFailure(error.message || "Something went wrong"));
      return Promise.reject(error.message);
    }
  };