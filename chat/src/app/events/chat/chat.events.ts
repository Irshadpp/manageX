import { socketWrapper } from "../../../config/socket-wrapper";
import { ChatService } from "../../services/chat/chat.service";
import { MessageService } from "../../services/message/message.service";

const messageService = new MessageService();
const chatService = new ChatService();

export class ChatEvents{
    static init(){
        console.log("chat socket connection init called-------------------")
        const io = socketWrapper.io;

        io.on('connection', (socket) =>{
            console.log(`User connected ${socket.id}`);

            socket.on('joinRoom', ({chatId}) =>{
                socket.join(chatId);
                console.log(`User joined chat room ${chatId}`);
            });

            socket.on('sendMessage', async ({chatId, content, type, from}) =>{
                try {
                    const message = await messageService.saveMessage({chatId, content, type, from});
                    io.emit('newMessage', message)
                    console.log("message emited successfully", message)
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