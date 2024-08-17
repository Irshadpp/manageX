import { UserAttrs, UserDoc } from "../../model/user.model";

export interface IUserService{
    createUser(attrs: UserAttrs): Promise<UserDoc>;
    findByEmail(email: string): Promise<UserDoc | null>;
    verifyUserEmail(userId: string): Promise<void>
}