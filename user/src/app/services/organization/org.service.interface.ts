import { OrgAttrs, OrgDoc } from "../../model/organization.model";

export interface IOrgService{
    createOrg(attrs: OrgAttrs): Promise<OrgDoc>
    // updateOrg(attrs: OrgAttrs): Promise<OrgDoc>
}