import { BadRequestError } from "@ir-managex/common";
import jwt, {JsonWebTokenError} from "jsonwebtoken";

export const generateEmailToken = (id: string): string =>{

    const token = jwt.sign(
        {id: id},
        process.env.JWT_EMAIL_SECRET!,
        {expiresIn: '1h'}
    )

    return token;
}

export const verifyEamilToken = (toekn: string): {id: string}=>{
    try { 
        console.log("verifiying email........on employee")
        const payload = jwt.verify(toekn, process.env.JWT_EMAIL_SECRET!) as {id: string};
        console.log(payload)
        return payload;
    } catch (error) {
        if(error instanceof JsonWebTokenError){
            console.log(error)
            throw new BadRequestError("Invalid or expired token")
        }
        throw new BadRequestError("Something went wrong while verifying the token");
    }
}