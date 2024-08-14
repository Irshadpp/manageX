import { UserAttrs } from "../mongodb/model/user.model";
import { User } from "../mongodb/schema/user.schema";

export class UserRepository{
    async createUser(attrs: UserAttrs){
        return new User(attrs).save()
    }
}