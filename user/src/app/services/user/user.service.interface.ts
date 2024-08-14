import { UserAttrs, UserDoc } from "../../database/mongodb/model/user.model";

export interface IUserService{
    createUser(attrs: UserAttrs): Promise<UserDoc>;
}