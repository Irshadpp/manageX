import { v4 as uuidv4 } from 'uuid';
import { connectedUsers, rooms } from '../..';

export const joinRoom = (data: any, socket: any, io: any) =>{
    const {identity, roomId, onlyAudio} = data;
    const newUser = {
        identity,
        id: uuidv4(),
        socketId: socket.id,
        roomId,
        onlyAudio
    }

    const room = rooms.find(r => r.id === roomId);
    room.connectedUsers.push(newUser);
    
    socket.join(roomId);

    connectedUsers.push(newUser);

    //emit to all users which are already in this room to prepare peer connection
    room.connectedUsers.forEach((user: any) => {
        if(user.socketId !== socket.id){
            const data = {
                connUserSocketId: socket.id
            }
            io.to(user.socketId).emit("conn-prepare", data)
        }
    })

    io.to(roomId).emit("room-updated", {connectedUsers: room.connectedUsers})
}