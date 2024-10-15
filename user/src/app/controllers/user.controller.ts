import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user/user.service";
import { CommonMessages, HttpStatusCode, JWTUserPayload, NotFoundError, sendResponse } from "@ir-managex/common";
import { ProjectUserUpdatedPublisher } from "../events/publishers/project-user-updated-publisher";
import { rabbitmqWrapper } from "../../config/rabbimq-wrapper";
import { ChatUserUpdatedPublisher } from "../events/publishers/chat-user-updated-publisher";

const userService = new UserService();

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.user as JWTUserPayload;
    const checkUser = userService.findById(id);
    if (!checkUser) {
      throw new NotFoundError();
    }
    const userData = req.body;
    const updatedUser = await userService.updateUser(id, userData);

    const projectUserEventData = ProjectUserUpdatedPublisher.mapToEventData(updatedUser!);
    await new ProjectUserUpdatedPublisher(rabbitmqWrapper.channel).publish(projectUserEventData);

    const ChatUserEventData = ChatUserUpdatedPublisher.mapToEventData(updatedUser!);
    await new ChatUserUpdatedPublisher(rabbitmqWrapper.channel).publish(ChatUserEventData);

    sendResponse(res, HttpStatusCode.OK, "User details updated successfully");

  } catch (error) {
    console.log(error);
  }
};

export const fetchUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userService.getUsersByRole();
    sendResponse(res, HttpStatusCode.OK, "Fetched users successfully", { users });
  } catch (error) {
    console.log(error);
  }
};

export const blockUser = async (req: Request, res: Response, next: NextFunction) =>{
  try {
    const {id} = req.params;
    const user = await userService.findById(id);
    if(!user){
      throw new NotFoundError();
    }
    await userService.blockAndUnblock(id);
    sendResponse(res, HttpStatusCode.OK, CommonMessages.SUCCESS)
  } catch (error) {
    console.log(error);
  }
}
