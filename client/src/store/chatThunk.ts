import { apiRequest } from "@/services/api/commonRequest";
import { AppDispatch } from ".";
import { createGroupFailure, createGroupRequest, createGroupSuccess, fetchChatFailure, fetchChatRequest, fetchChatSuccess } from "./chatSlice";


export const fetchChats = () => async (dispatch: AppDispatch) => {
    dispatch(fetchChatRequest());
    try {
      const response: any = await apiRequest({
        method: "GET",
        url: import.meta.env.VITE_BACKEND_URL,
        route: `/api/v1/chat`,
        headers: {
          "Content-type": "application/json"
        }
      });
      if (response.errors && response.errors.length > 0) {
        const errorMessage = response.errors[0].message;
        dispatch(fetchChatFailure(errorMessage));
      } else {
        dispatch(fetchChatSuccess(response.data));
        return {success: true}
      }
    } catch (error: any) {
      dispatch(fetchChatFailure(error.message || "Something went wrong"));
      return Promise.reject(error.message); 
    }
  };

export const createGroup = (data: any) => async (dispatch: AppDispatch) => {
    dispatch(createGroupRequest());
    try {
      const response: any = await apiRequest({
        method: "POST",
        url: import.meta.env.VITE_BACKEND_URL,
        route: `/api/v1/chat`,
        data: data,
        headers: {
          "Content-type": "application/json"
        },
      });
      if (response.errors && response.errors.length > 0) {
        const errorMessage = response.errors[0].message;
        dispatch(createGroupFailure(errorMessage));
      } else {
        console.log(response.data)
        dispatch(createGroupSuccess(response.data));
        return {success: true}
      }
    } catch (error: any) {
      dispatch(createGroupFailure(error.message || "Something went wrong"));
      return Promise.reject(error.message); 
    }
  };