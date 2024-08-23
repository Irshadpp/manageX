import { OrgAttrs, OrgDoc } from "../../model/organization.model";
import { Organization } from "../../model/schema/organization.schema";
import { IOrgService } from "./org.service.interface";

export class OrgService implements IOrgService{
    async createOrg(attrs: OrgAttrs): Promise<OrgDoc> {
        const newOrg = Organization.build(attrs);
        return await newOrg.save();
    }
}