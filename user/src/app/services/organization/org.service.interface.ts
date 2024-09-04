import { OrgAttrs, OrgDoc } from "../../model/organization.model";

export interface IOrgService {
  createOrg(attrs: OrgAttrs): Promise<OrgDoc>;
  findOrgById(orgId: string): Promise<OrgDoc | null>;
  updateOrg(orgId: string, attrs: Partial<OrgAttrs>, isAddress: boolean): Promise<OrgDoc | null>;
  fetchOrgs(): Promise<any>;
}
