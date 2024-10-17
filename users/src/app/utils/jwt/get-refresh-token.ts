import { Request } from "express";

const getRefreshToken = (req: Request) =>{
    const authHead = req.headers.authorization;
    if(!authHead){
        throw new Error("refresh token not found");
    }
    const token = authHead.split(" ")[1];
    return token;
}

export default getRefreshToken;