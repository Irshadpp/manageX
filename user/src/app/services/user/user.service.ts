import { UserAttrs, UserDoc } from "../../database/mongodb/model/user.model";
import { UserRepository } from "../../database/repository/user.repository";
import Password from "../../utils/password";
import { IUserService } from "./user.service.interface";

export class UserService implements IUserService{
    private userRepository = new UserRepository();

    async createUser(attrs: UserAttrs): Promise<UserDoc> {
        const hashedPassword = await Password.toHash(attrs.password);
        return this.userRepository.createUser({...attrs, password: hashedPassword});
    }
}