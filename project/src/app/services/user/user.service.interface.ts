import { UserAttrs, UserDoc } from "../../model/user.model";

export interface IUserService{
    createUser(attrs: UserAttrs): Promise<UserDoc>
    updateUser(id: string, attrs: UserAttrs): Promise<UserDoc | null>
}