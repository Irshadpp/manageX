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

    async findByEmail(email: string): Promise<boolean>{
        const user = await User.findOne({email});
        return user !== null
    }

}