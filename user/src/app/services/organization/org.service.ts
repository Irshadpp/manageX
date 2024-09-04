import { OrgAttrs, OrgDoc } from "../../model/organization.model";
import { Organization } from "../../model/schema/organization.schema";
import { IOrgService } from "./org.service.interface";

export class OrgService implements IOrgService {
  async createOrg(attrs: OrgAttrs): Promise<OrgDoc> {
    const newOrg = Organization.build(attrs);
    return await newOrg.save();
  }

  async findOrgById(orgId: string): Promise<OrgDoc | null> {
    return await Organization.findById(orgId);
  }

  async updateOrg(
    orgId: string,
    attrs: Partial<OrgAttrs>,
    isAddress: boolean
  ): Promise<OrgDoc | null> {
    const updateFields: any = {};
    if (isAddress) {
      for (const [key, value] of Object.entries(attrs)) {
        updateFields[`address.${key}`] = value;
      }
    } else {
      Object.assign(updateFields, attrs);
    }
    return await Organization.findByIdAndUpdate(
      orgId,
      { $set: updateFields },
      { new: true, runValidators: true }
    );
  }
  
  async fetchOrgs(): Promise<any> {
    return await Organization.find().populate({
      path: 'admin',
      select: 'fName email phone'
    }).select('orgName industry');
  }

  async getOrgsByPlan(): Promise<any>{
    return await Organization.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "admin",
          foreignField: "_id",
          as: "organization",
        },
      },
      { $unwind: "$organization" },
      {
        $facet: {
          free: [
            { $match: { subscriptionType: "free" } },
            {
              $project: {
                username: 1,
                email: 1,
                phone: 1,
                industry: 1,
                // createdAt: 1
                org: "$organization.orgName",
              },
            },
          ],
          pro: [
            { $match: { subscriptionType: "pro" } },
            {
              $project: {
                username: 1,
                email: 1,
                phone: 1,
                industry: 1,
                // createdAt: 1
                org: "$organization.orgName",
              },
            },
          ],
          business: [
            { $match: { subscriptionType: "business" } },
            {
              $project: {
                username: 1,
                email: 1,
                phone: 1,
                industry: 1,
                // createdAt: 1
                org: "$organization.orgName",
              },
            },
          ],
        },
      },
    ]);
  }
}
