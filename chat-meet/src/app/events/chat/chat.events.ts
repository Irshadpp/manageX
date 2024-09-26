import { socketWrapper } from "../../../config/socket-wrapper";
import { ChatService } from "../../services/chat/chat.service";
import { MessageService } from "../../services/message/message.service";

const messageService = new MessageService();
const chatService = new ChatService();

export class ChatEvents{
    static init(){
        const io = socketWrapper.io;

        io.on('connection', (socket) =>{
            console.log(`User connected ${socket.id}`);

            socket.on('joinRoom', ({chatId}) =>{
                socket.join(chatId);
                console.log(`User joined chat room ${chatId}`);
            });

            socket.on('createChat', async ({ participants, type, groupName, groupDescription }) => {
                const chat = await chatService.createChat({
                  participants,
                  type,
                  groupName,
                  groupDescription,
                });
                socket.emit('chatCreated', chat);  // Emit chatCreated to the user who created the chat
              });

            socket.on('sendMessage', async ({chatId, content, type, from, to}) =>{
                try {
                    const message = await messageService.saveMessage({chatId, content, type, from, to});
                    io.to(chatId).emit('newMessage', message)
                } catch (error) {
                    console.error('Error saving message:', error);
                }
            });

            socket.on('disconnect', () =>{
                console.log(`User disconnected ${socket.id}`)
            })
        })
    }
}