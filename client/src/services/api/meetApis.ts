import axios from "axios";


export const getRoomExists = async (roomId: string) =>{
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/meet/room-exists/${roomId}`);
    return response.data;
}

export const getTURNCredentials = async () =>{
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/meet/get-turn-credentials`);
    return response.data;
}