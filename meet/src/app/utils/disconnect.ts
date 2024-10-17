import { connectedUsers, rooms } from "../.."

export const disconnect = (socket: any, io: any) =>{
    const user = connectedUsers.find(u => u.socketId === socket.id);
    console.log(user,"user------------")
    if(user){
        const room = rooms.find(r => r.id === user.roomId)

        room.connectedUsers = room.connectedUsers.filter((u: any) => u.socketId !== socket.id);

        room.connectedUsers.forEach((e: any, index: number) => {
            console.log(e, "user", index)
        });

        //leave socket io room
        socket.leave(user.roomId)

        if(room.connectedUsers.length > 0){

            //emit to all users which are still in the roo that user disconnected
            io.to(room.id).emit("user-disconnected", {socketId: socket.id});

            io.to(room.id).emit("room-updated", {connectedUsers: room.connectedUsers})      
        }else{
            const roomIndex = rooms.indexOf(room);
                if (roomIndex > -1) {
                    rooms.splice(roomIndex, 1);  // Modify rooms array by removing the room
                }
        }

    }
}