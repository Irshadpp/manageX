import { UserAttrs, UserDoc } from "../../model/user.model";
import Password from "../../utils/password";
import { IUserService } from "./user.service.interface";
import { User } from "../../model/schema/user.schema";

export class UserService implements IUserService{
    
    async createUser(attrs: UserAttrs): Promise<UserDoc>{
        const hashedPassword = await Password.toHash(attrs.password);
        const newUser = User.build({...attrs, password: hashedPassword});
        return await newUser.save();
    }

    async createUserWithGoogle(attrs: UserAttrs): Promise<UserDoc>{
        const newUserWithGoogle = User.build(attrs);
        return await newUserWithGoogle.save();
    }

    async updateUser(userId: string, attrs: UserAttrs):Promise<UserDoc | null>{
        return await User.findByIdAndUpdate(userId, {...attrs});
    }

    async findByEmail(email: string): Promise<UserDoc | null>{
        const user = await User.findOne({email});
        return user;
    }

    async findById(userId: string): Promise<UserDoc | null> {
        return await User.findById(userId)
    }

    async verifyUserEmail(userId: string): Promise<UserDoc | null> {
        return await User.findByIdAndUpdate(userId, {isEmailVerified: true});
    }
}