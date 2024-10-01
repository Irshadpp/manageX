import mongoose from "mongoose";
import { ChatAttrs, ChatDoc } from "../../model/chat.model";
import { ChatType } from "../../model/enum";
import { Chat } from "../../model/schema/chat.schema";
import { User } from "../../model/schema/user.schema";
import { UserDoc } from "../../model/user.model";
import { IChatService } from "./chat.service.interface";

export class ChatService implements IChatService{
    async createChat(attrs: ChatAttrs): Promise<any> {
    return await Chat.build(attrs).save();
  }

  async getChatsByUserId(userId: string): Promise<any> {
    const chats = await Chat.aggregate([
      {
        $match: {
          participants: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "messages",
          localField: "_id",
          foreignField: "chatId",
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
        $addFields: {
          otherParticipant: {
            $filter: {
              input: "$participantsInfo",
              as: "participant",
              cond: { $ne: ["$$participant._id", new mongoose.Types.ObjectId(userId)] },
            },
          },
        },
      },
      {
        $unwind: {
          path: "$otherParticipant",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: "$messages",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "messages.from",
          foreignField: "_id",
          as: "fromDetails",
        },
      },
      {
        $group: {
          _id: "$_id",
          type: { $first: "$type" },
          name: {
            $first: {
              $cond: {
                if: { $eq: ["$type", "one-on-one"] },
                then: { $concat: ["$otherParticipant.fName", " ", "$otherParticipant.lName"] },
                else: null,
              },
            },
          },
          profileURL: {
            $first: {
              $cond: [
                { $eq: ["$type", "one-on-one"] },
                "$otherParticipant.profileURL",
                null,
              ],
            },
          },
          groupName: {
            $first: {
              $cond: [
                { $eq: ["$type", "group"] },
                "$groupName",
                null,
              ],
            },
          },
          groupProfile: {
            $first: {
              $cond: [
                { $eq: ["$type", "group"] },
                "$groupProfile",
                null,
              ],
            },
          },
          messages: {
            $addToSet: {
              $mergeObjects: [
                "$messages",
                { fromDetails: { $arrayElemAt: ["$fromDetails", 0] } }
              ],
            },
          },
          latestMessageTime: { $max: "$messages.createdAt" },
        },
      },
      {
        $project: {
          id: "$_id",
          type: 1,
          name: 1,
          profileURL: 1,
          groupName: 1,
          groupProfile: 1,
          messages: {
            $map: {
              input: {
                $sortArray: {
                  input: "$messages",
                  sortBy: { createdAt: 1 } 
                }
              },
              as: "msg",
              in: {
                id: "$$msg._id",
                message: "$$msg.content",
                timestamp: "$$msg.createdAt",
                name: {
                  $concat: ["$$msg.fromDetails.fName", " ", "$$msg.fromDetails.lName"]
                },
                userId: "$$msg.fromDetails._id",
                profileURL: "$$msg.fromDetails.profileURL",
              },
            },
          },
          latestMessageTime: 1,
        },
      },
      {
        $sort: {
          latestMessageTime: -1,
        },
      },
    ]);

    const formattedChats = chats.map(chat => ({
      id: chat.id,
      type: chat.type,
      name: chat.name || null,
      profileURL: chat.profileURL || null,
      groupName: chat.groupName || null,
      groupProfile: chat.groupProfile || null,
      messages:  chat.messages[0].id === undefined ? [] : chat.messages
    }));

    return formattedChats;
}



  


  async createChatsForNewUser(newUser: UserDoc): Promise<void> {

    const existingUsers = await User.find({
        organizationId: newUser.organizationId,
        _id: { $ne: newUser.id },
    });


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
}
}
