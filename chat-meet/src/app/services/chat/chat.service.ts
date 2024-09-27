import { ChatAttrs, ChatDoc } from "../../model/chat.model";
import { ChatType } from "../../model/enum";
import { Chat } from "../../model/schema/chat.schema";
import { User } from "../../model/schema/user.schema";
import { UserDoc } from "../../model/user.model";
import { IChatService } from "./chat.service.interface";

export class ChatService implements IChatService{
    async createChat(attrs: ChatAttrs): Promise<ChatDoc> {
    const chat = Chat.build(attrs);
    return await chat.save();
  }

   async getChatsByUserId(userId: string): Promise<ChatDoc[] | null> {
    const chats = await Chat.aggregate([
      {
        $match: {
          participants: userId,
        },
      },
      {
        $lookup: {
          from: "messages",
          let: { chatId: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$chatId", "$$chatId"] } } },
            { $sort: { createdAt: 1 } }, 
          ],
          as: "messages",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "participants",
          foreignField: "_id",
          as: "participantsInfo",
        },
      },
      {
        $project: {
          id: "$_id",
          type: 1,
          groupName: 1,
          groupProfile: 1,
          participantsInfo: {
            id: 1,
            fName: 1,
            lName: 1,
            profileURL: 1,
          },
          messages: {
            id: "$messages._id",
            content: "$messages.content",
            timestamp: "$messages.createdAt",
            from: "$messages.from",
          },
        },
      },
      { $sort: { "messages.timestamp": -1 } },
    ]);
  
    return chats;
  }

  async createChatsForNewUser(newUser: UserDoc): Promise<void> {
    console.log("createChatsForNewUser function called..................");

    const existingUsers = await User.find({
        organizationId: newUser.organizationId,
        _id: { $ne: newUser.id },
    });

    console.log("Existing users to create chats for new user...........", existingUsers);

    const participantIds = existingUsers.map(user => user.id);
    participantIds.push(newUser.id);

    const chatPromises = participantIds.map(async (participantId, index) => {
        if (index < existingUsers.length) {
            const existingUser = existingUsers[index];

            const chat = await Chat.findOne({
                participants: { $all: [newUser.id, existingUser.id], $size: 2 },
                type: ChatType.ONE_ON_ONE,
            });

            if (!chat) {
                return Chat.create({
                    participants: [newUser.id, existingUser.id],
                    type: ChatType.ONE_ON_ONE,
                    organizationId: newUser.organizationId,
                });
            }

            return chat;
        }
    });

    const result = await Promise.all(chatPromises);
    console.log("Chats created or found: ", result);
}
}
