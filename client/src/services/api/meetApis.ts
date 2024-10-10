import axios from "axios";

// const serverApi = "http://localhost:8000/api/v1";
const serverApi = "https://1z0cd2xj-8000.inc1.devtunnels.ms/api/v1";

export const getRoomExists = async (roomId: string) =>{
    const response = await axios.get(`${serverApi}/meet/room-exists/${roomId}`);
    return response.data;
}

export const getTURNCredentials = async () =>{
    const response = await axios.get(`${serverApi}/meet/get-turn-credentials`);
    return response.data;
}