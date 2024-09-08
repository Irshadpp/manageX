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
        return config;
    })

    apiInstance.interceptors.response.use(
        (response) =>{
            return response.data;
        },

        async (error) =>{

            const originalRequest = error.config;

            if(error?.response?.status === 401 && !originalRequest._retry){
                originalRequest._retry = true;

                try {
                    const refreshApiInstance = axios.create({
                        baseURL: url,
                        withCredentials: withCredential,
                      });
                    const refreshResponse = await refreshApiInstance.post("/api/v1/auth/refresh-token");

                    // const {accessToken} = refreshResponse.data;

                    store.dispatch(setCredentials({user: store.getState().auth.user}));

                    return apiInstance(originalRequest);    
                } catch (refreshError) {
                    store.dispatch(clearCredentials());
                    return Promise.reject(refreshError)
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
        console.log(error)
        return error
    }
}