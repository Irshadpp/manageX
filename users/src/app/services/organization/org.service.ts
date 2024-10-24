import { OrgAttrs, OrgDoc } from "../../model/organization.model";
import { Organization } from "../../model/schema/organization.schema";
import { IOrgService } from "./org.service.interface";

export class OrgService implements IOrgService {
  async createOrg(attrs: OrgAttrs): Promise<OrgDoc> {
    const newOrg = Organization.build(attrs);
    return await newOrg.save();
  }

  async findOrgById(orgId: string): Promise<OrgDoc | null> {
    const org = await Organization.findById(orgId);
    console.log(org, "orrggggggggggggggg=============<<<<<<<<<<<<<<<<<")
    return org 
  }

  async updateOrg(
    orgId: string,
    attrs: Partial<OrgAttrs>,
    isAddress?: boolean
  ): Promise<OrgDoc | null> {
    const updateFields: any = {};
    if (isAddress) {
      for (const [key, value] of Object.entries(attrs)) {
        updateFields[`address.${key}`] = value;
      }
    } else {
      for(const [key, value] of Object.entries(attrs)){
        if(Array.isArray(value)){
          updateFields[`$addToSet`] = { [key]: {$each: value}};
        }else{
          updateFields[`$set`] = { [key]: value };
        }
      }
    }
    return await Organization.findByIdAndUpdate(
      orgId,
      updateFields,
      { new: true, runValidators: true }
    );
  }
  
  async fetchOrgWithName(orgName: string): Promise<any> {
    return await Organization.findOne({orgName: {$regex: orgName, $options: "i"}});
  }

  async getOrgsByPlan(): Promise<any>{
    return await Organization.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "admin",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $facet: {
          free: [
            { $match: { subscriptionType: "free", "user.role": {$ne: "admin"} } },
            {
              $project: {
                username: "$user.username",
                email: "$user.email",
                phone: "$user.phone",
                industry: 1,
                createdAt: 1,
                organization: "$orgName",
              },
            },
          ],
          pro: [
            { $match: { subscriptionType: "pro" } },
            {
              $project: {
                username: "$user.username",
                email: "$user.email",
                phone: "$user.phone",
                industry: 1,
                createdAt: 1,
                organization: "$orgName",
              },
            },
          ],
          business: [
            { $match: { subscriptionType: "business" } },
            {
              $project: {
                username: "$user.username",
                email: "$user.email",
                phone: "$user.phone",
                industry: 1,
                createdAt: 1,
                organization: "$orgName",
              },
            },
          ],
        },
      },
    ]);
  }
}
