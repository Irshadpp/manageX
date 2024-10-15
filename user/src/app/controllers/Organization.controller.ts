import { BadRequestError, CommonMessages, HttpStatusCode, JWTUserPayload, NotFoundError, sendResponse } from "@ir-managex/common";
import { NextFunction, Request, Response } from "express";
import { OrgService } from "../services/organization/org.service";

const orgService = new OrgService();

export const updateOrg = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { organization } = req.user as JWTUserPayload;
    const checkOrg = orgService.findOrgById(organization);
    if (!checkOrg) {
      throw new NotFoundError();
    }
    const orgData = req.body;
    
    if(orgData?.orgName){
      const existingOrg = await orgService.fetchOrgWithName(orgData.orgName);
      if(existingOrg){
        throw new BadRequestError("Organization already exists")
      }
    }

    const checkAddressQuery = req.query.address;
    const isAddress: boolean = checkAddressQuery ? true : false;
    const updatedOrg = await orgService.updateOrg(
      organization,
      orgData,
      isAddress
    );
    sendResponse(res, HttpStatusCode.OK, CommonMessages.SUCCESS);
  } catch (error) {
    console.log(error);
  }
};

export const fetchOrgs = async (req: Request, res: Response, next: NextFunction) =>{
  try {
    const orgsData = await orgService.getOrgsByPlan()
    sendResponse(res, HttpStatusCode.OK, CommonMessages.SUCCESS, orgsData );
  } catch (error) {
    console.log(error)
    next(error);
  }
}
