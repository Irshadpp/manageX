import axios from "axios";

export const uploadImage = async (selectedFile: any) =>{
    if (!selectedFile) {
        console.error("No file selected for upload.");
        return;
    }
    const formData = new FormData();
    formData.append("file", selectedFile as Blob);
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET as string);

    try {
        const res = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/image/upload`,
            formData);
        return res.data.secure_url  
    } catch (error) {
        console.log(error);
    }
}