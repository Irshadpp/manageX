import bcrypt from "bcrypt"

class Password {
    static async toHash(password: string):Promise<string>{
        return bcrypt.hash(password, 10);
    }
    static async compare(storedPassword: string, suppliedPassword: string):Promise<boolean>{
        return bcrypt.compare(suppliedPassword, storedPassword);
    }
}

export default Password;