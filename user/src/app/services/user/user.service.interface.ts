import { UserAttrs, UserDoc } from "../../model/user.model";

export interface IUserService{
    createUser(attrs: UserAttrs): Promise<UserDoc>;
    createUserWithGoogle(attrs: UserAttrs): Promise<UserDoc>;
    updateUser(userId: string, attrs: UserAttrs): Promise<UserDoc | null>;
    findByEmail(email: string): Promise<UserDoc | null>;
    verifyUserEmail(userId: string): Promise<UserDoc | null>;
    findById(userId: string): Promise<UserDoc | null>;
    getUsersByRole(): Promise<any>;
}