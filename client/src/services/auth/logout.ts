import { deleteObject } from "@/utils/local-storage"

export const logout = () =>{
    deleteObject("userData");
    window.location.reload();
}