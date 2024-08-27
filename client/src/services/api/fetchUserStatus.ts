import { apiRequest } from "./commonRequest";

export const fetchUserStatus = async (userId: string) => {
  try {
    const response = await apiRequest({
        method: "GET",
        url: import.meta.env.VITE_USERS_URL,
        route: `/api/v1/users/status/${userId}`,
      headers: {
        "Content-Type": "application/json"
      }
    });
    return response;
  } catch (error) {
    throw new Error("Failed to fetch user status");
  }
};
