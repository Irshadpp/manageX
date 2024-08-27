import { UserAttrs, UserDoc } from "../../model/user.model";
import Password from "../../utils/password";
import { IUserService } from "./user.service.interface";
import { User } from "../../model/schema/user.schema";

export class UserService implements IUserService {
  async createUser(attrs: UserAttrs): Promise<UserDoc> {
    const hashedPassword = await Password.toHash(attrs.password);
    const newUser = User.build({ ...attrs, password: hashedPassword });
    return await newUser.save();
  }

  async createUserWithGoogle(attrs: UserAttrs): Promise<UserDoc> {
    const newUserWithGoogle = User.build(attrs);
    return await newUserWithGoogle.save();
  }

  async updateUser(userId: string, attrs: UserAttrs): Promise<UserDoc | null> {
    return await User.findByIdAndUpdate(userId, { ...attrs });
  }

  async findByEmail(email: string): Promise<UserDoc | null> {
    const user = await User.findOne({ email });
    return user;
  }

  async findById(userId: string): Promise<UserDoc | null> {
    return await User.findById(userId);
  }

  async verifyUserEmail(userId: string): Promise<UserDoc | null> {
    return await User.findByIdAndUpdate(userId, { isEmailVerified: true });
  }

  async getUsersByRole(): Promise<any> {
    return await User.aggregate([
      {
        $lookup: {
          from: "organizations",
          localField: "organizationId",
          foreignField: "_id",
          as: "organization",
        },
      },
      { $unwind: "$organization" },
      {
        $facet: {
          owners: [
            { $match: { role: "owner" } },
            {
              $project: {
                _id: 0,
                fName: 1,
                lName: 1,
                email: 1,
                phone: 1,
                isActive: 1,
                org: "$organization.orgName",
              },
            },
          ],
          managers: [
            { $match: { role: "manager" } },
            {
              $project: {
                _id: 0,
                fName: 1,
                lName: 1,
                email: 1,
                phone: 1,
                isActive: 1,
                org: "$organization.orgName",
              },
            },
          ],
          employees: [
            { $match: { role: "employee" } },
            {
              $project: {
                _id: 0,
                fName: 1,
                lName: 1,
                email: 1,
                phone: 1,
                isActive: 1,
                org: "$organization.orgName",
              },
            },
          ],
        },
      },
    ]);
  }

  async getStatusById(userId: string): Promise<boolean | null>{
    const user = await User.findOne({ _id: userId }, { isActive: 1, _id: 0 }).lean();
  return user ? user.isActive : null;
  }
}
