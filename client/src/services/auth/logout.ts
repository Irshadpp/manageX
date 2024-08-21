import { deleteObject } from "@/utils/local-storage"
import { useNavigate } from "react-router-dom";

export const logout = () =>{
    deleteObject("userData");
}