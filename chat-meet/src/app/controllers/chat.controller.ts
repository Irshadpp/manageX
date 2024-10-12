import { NextFunction, Request, Response } from 'express';
import { ChatService } from '../services/chat/chat.service';
import { ChatType } from '../model/enum';
import { BadRequestError, HttpStatusCode, sendResponse } from '@ir-managex/common';

const chatService = new ChatService()
export const getChats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req?.user?.id;
    const chats = await chatService.getChatsByUserId(userId!);
    sendResponse(res, HttpStatusCode.OK, "Chats fetched successfully", chats );
  } catch (error) {
    next(error);
  }
};


export const createChat = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { participants, type } = req.body;
  
      if (!participants || participants.length < 2) {
        throw new BadRequestError('At least two participants are required')
      }
  
      if (type === ChatType.ONE_ON_ONE && participants.length > 2) {
        throw new BadRequestError('Single chat can only have two participants');
      }
  
      const chat = await chatService.createChat(req.body);
      sendResponse(res, HttpStatusCode.CREATED, "Chat created successfully", chat );
    } catch (error) {
      next(error);
    }
  };