import { getTURNCredentials } from "@/services/api/meetApis";

let TURNIceServers: any = null;

export const fetchTURNCredentials = async () =>{
    const responseData = await getTURNCredentials();

    if(responseData?.token?.iceServers){
        TURNIceServers = responseData.token.iceServers;
    }

    return TURNIceServers;
}

export const getTurnIceServers = () => TURNIceServers;