import { v4 as uuidv4 } from 'uuid';
import { connectedUsers, rooms } from '../..';

export const createNewRoom = (data: any, socket: any) =>{
    const roomId = uuidv4();
    const {identity, onlyAudio} = data; 
    const newUser = {
        identity,
        id: uuidv4(),
        socketId: socket.id,
        roomId,
        onlyAudio
    }
    connectedUsers.push(newUser);

    const newRoom = {
        id: roomId,
        connectedUsers: [newUser]
    }

    socket.join(roomId);

    rooms.push(newRoom);

    socket.emit('room-id', {roomId});

    socket.emit('room-updated', {connectedUsers: newRoom.connectedUsers});
}