import { UserAttrs, UserDoc } from "../../model/user.model";
import Password from "../../utils/password";
import { IUserService } from "./user.service.interface";
import { User } from "../../model/schema/user.schema";

export class UserService implements IUserService {
  async createUser(attrs: UserAttrs): Promise<UserDoc> {
    const hashedPassword = await Password.toHash(attrs.password!);
    const newUser = User.build({ ...attrs, password: hashedPassword });
    return await newUser.save();
  }

  async createEmployeeUser(attrs: UserAttrs): Promise<UserDoc>{
    const newUser = User.build(attrs);
    return await newUser.save();
  }

  async createUserWithGoogle(attrs: UserAttrs): Promise<UserDoc> {
    const newUserWithGoogle = User.build(attrs);
    return await newUserWithGoogle.save();
  }

  async updateUser(id: string, attrs: UserAttrs): Promise<UserDoc | null> {
    return await User.findByIdAndUpdate(id, { ...attrs }, {new: true});
  }

  async findByEmail(email: string): Promise<UserDoc | null> {
    const user = await User.findOne({ email });
    return user;
  }

  async findById(id: string): Promise<UserDoc | null> {
    return await User.findById(id);
  }

  async verifyUserEmail(id: string): Promise<UserDoc | null> {
    return await User.findByIdAndUpdate(id, { isEmailVerified: true });
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
                username: 1,
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
                username: 1,
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
                username: 1,
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

  async getUserById(id: string): Promise<boolean | null> {
    return await User.findOne(
      { _id: id },{role: 1, isActive: 1, organizationId: 1}
    )
  }

  async blockAndUnblock(id: string) {
    await User.updateOne(
      { _id: id },
      [{ $set: { isActive: { $not: "$isActive" } } }]
    );
  }
}
