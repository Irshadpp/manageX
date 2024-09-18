import { User } from "../../model/schema/user.schema";
import { UserAttrs, UserDoc } from "../../model/user.model";
import { IUserService } from "./user.service.interface";

export class UserService implements IUserService{
    async createUser(attrs: UserAttrs){
        const newUser = User.build(attrs);
        return await newUser.save();
    }

    async updateUser(id: string, attrs: UserAttrs): Promise<UserDoc | null> {
        return await User.findByIdAndUpdate(id, { ...attrs }, {new: true});
      }
}