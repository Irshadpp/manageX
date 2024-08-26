import store from "@/store";
import { clearCredentials, setCredentials } from "@/store/authSlice";
import { getObject, storeObject } from "@/utils/local-storage";
import axios from "axios";

interface RequestProps{
    method: string;
    url?: string;
    route?: string;
    headers: {};
    data?: {};
    withCredential?: boolean;
}

export const apiRequest = async ({method, url, route, headers, data, withCredential = true}: RequestProps) : Promise<any> =>{
    const apiInstance = axios.create({
        baseURL: url,
        withCredentials: withCredential
    })

    apiInstance.interceptors.request.use((config)=>{
        const userData = getObject("userData");
        if(userData && userData.accessToken){
            config.headers["Authorization"] = `Bearer ${userData.accessToken}`
        }
        return config;
    })

    apiInstance.interceptors.response.use(
        (response) =>{
            return response.data;
        },

        async (error) =>{

            const originalRequest = error.config;
            const userData = getObject("userData");

            //if error is due to accessToken expiration and havn't retried yet
            if(error.response.status === 401 && !originalRequest._retry && userData){
                originalRequest._retry = true;

                try {
                    const refreshResponse = await apiInstance.post("/api/v1/auth/refresh-token",{
                        refreshToken: userData.refreshToken,
                    });

                    const {accessToken, refreshToken} = refreshResponse.data;

                    const updatedUserData = {
                        user: {...userData.user},
                        accessToken,
                        refreshToken
                    }

                    storeObject("userData", updatedUserData);
                    store.dispatch(setCredentials(updatedUserData));

                    originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
                    return apiInstance(originalRequest);    
                } catch (error) {
                    store.dispatch(clearCredentials());
                    return Promise.reject(error)
                }
            }
            return Promise.reject(error.response?.data || error.message)
        }
    )

    let requestConfig: RequestProps = {
        method,
        url: route,
        data,
        headers,
        withCredential: true
    }

    try {
        const response = await apiInstance(requestConfig);
        return response;
    } catch (error) {
        return error
    }
}