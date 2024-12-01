import { UserAttrs, UserDoc } from "../../model/user.model";

export interface IUserService{
    createUser(attrs: UserAttrs): Promise<UserDoc>;
    createEmployeeUser(attrs: UserAttrs): Promise<UserDoc>;
    createUserWithGoogle(attrs: UserAttrs): Promise<UserDoc>;
    updateUser(id: string, attrs: UserAttrs): Promise<UserDoc | null>;
    findByEmail(email: string): Promise<UserDoc | null>;
    verifyUserEmail(id: string): Promise<UserDoc | null>;
    findById(id: string): Promise<UserDoc | null>;
    getUsersByRole(): Promise<any>;
    getUserById(id: string): Promise<boolean | null>;
    blockAndUnblock(id: string): Promise<void>;
    updatePassword(id: string, password: string): Promise<void>;
} 