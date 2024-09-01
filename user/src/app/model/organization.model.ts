import mongoose from "mongoose";

interface addressObject{
    street: string;
    city: string;
    state: string;
    country: string;
}

export interface OrgAttrs{
    admin: string
    orgName?: string;
    description?: string;
    industry?: string;
    website?: string;
    subscriptionId?: string;
    subscriptionType?: string;
    subscriptionStripeId?: string;
    isActive?: string;
    address?: addressObject;
}

export interface OrgDoc extends mongoose.Document{
    admin: string
    orgName: string;
    description: string;
    industry: string;
    website: string;
    members: string[];
    project: string[];
    subscriptionId: string;
    subscriptionType: string;
    subscriptionStripeId: string;
    isActive: string;
    address: addressObject;
}

export interface OrgModel extends mongoose.Model<OrgDoc>{
    build(attrs: OrgAttrs): OrgDoc;
}