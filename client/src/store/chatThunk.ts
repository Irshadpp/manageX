import { apiRequest } from "@/services/api/commonRequest";
import { AppDispatch } from ".";
import { fetchChatFailure, fetchChatRequest, fetchChatSuccess } from "./chatSlice";


export const fetchChats = () => async (dispatch: AppDispatch) => {
    dispatch(fetchChatRequest());
    try {
      const response: any = await apiRequest({
        method: "GET",
        url: import.meta.env.VITE_CHAT_URL,
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