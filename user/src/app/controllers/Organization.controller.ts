import { JWTUserPayload, NotFoundError } from "@ir-managex/common";
import { NextFunction, Request, Response } from "express";
import { OrgService } from "../services/organization/org.service";

const orgService = new OrgService();

export const updateOrg = async (req: Request, res: Response, next: NextFunction) =>{
    try {
        const {organization} = req.user as JWTUserPayload;
        const checkOrg = orgService.findOrgById(organization);
        if(!checkOrg){
            throw new NotFoundError();
        }
        const orgData = req.body;
        const checkAddressQuery = req.query.address;
        console.log("--------------", checkAddressQuery)
        const isAddress: boolean = checkAddressQuery ? true : false
        const updatedOrg = await orgService.updateOrg(organization, orgData, isAddress);
        console.log("=============", updatedOrg);
        res.status(200).json({
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}