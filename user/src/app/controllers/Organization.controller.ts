import { BadRequestError, JWTUserPayload, NotFoundError } from "@ir-managex/common";
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
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const fetchOrgs = async (req: Request, res: Response, next: NextFunction) =>{
  try {
    const orgsData = await orgService.getOrgsByPlan()
    res.status(200).send({ success: true, data: orgsData});
  } catch (error) {
    console.log(error)
    next(error);
  }
}
