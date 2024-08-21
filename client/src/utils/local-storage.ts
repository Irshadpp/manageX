
export const storeObject = (key: string, object: any) =>{
    if(typeof window !== "undefined"){
        const json = JSON.stringify(object)
        localStorage.setItem(key, json);
    }
} 

export const getObject = (key: string)=>{
    if(typeof window !== "undefined"){
        const json: any = localStorage.getItem(key)
        return JSON.parse(json);
    }
    return null;
}

export const deleteObject = (key: string) =>{
    if(typeof window !== "undefined"){
        localStorage.removeItem(key);
    }
}