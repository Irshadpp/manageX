import { User } from "../../model/schema/user.schema";
import { UserAttrs } from "../../model/user.model";
import { IUserService } from "./user.service.interface";

export class UserService implements IUserService{
    async createUser(attrs: UserAttrs){
        const newUser = User.build(attrs);
        return await newUser.save();
    }
}