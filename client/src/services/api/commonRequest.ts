import { getObject } from "@/utils/local-storage";
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

    apiInstance.interceptors.response.use(
        (response) =>{
            return response.data;
        },

        (error) =>{
            return error.response?.data || error.message
        }
    )

    const userData: {accessToken: string, refreshToken: string} = getObject("userData");

    if(userData){
        headers = {
            ...headers,
            Authorization: `Bearer ${userData.accessToken}`
        }
    }

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