import { socketWrapper } from "../../../config/socket-wrapper";
import { createNewRoom } from "../../utils/create-new-room";
import { disconnect } from "../../utils/disconnect";
import { initializeConnectionHandler } from "../../utils/initialize-connection-handler";
import { joinRoom } from "../../utils/join-room";
import { signalingHandler } from "../../utils/signaling-handler";


export class SocketEvents{
    static init(){
        const io = socketWrapper.io;

        io.on('connection', (socket) =>{
            console.log(`User connected ${socket.id}`);

            socket.on('create-new-room', (data) =>{
                console.log(`hosting new room ${data}`);
                createNewRoom(data, socket);
            });

           socket.on('join-room', (data)=>{
            console.log("join room identity: ", data, "roomId: ");
            joinRoom(data, socket, io);
           })

            socket.on('disconnect', () =>{
                console.log(`User disconnected ${socket.id}`)
                disconnect(socket, io);
            })

            socket.on("conn-signal", (data) =>{
                signalingHandler(data, socket, io)
            })

            socket.on('conn-init', (data) =>{
                initializeConnectionHandler(data, socket, io);
            })
        })
    }
}