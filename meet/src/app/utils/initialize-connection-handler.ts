
//information from client which are already in room that they have prepared for incoming connection
export const initializeConnectionHandler = (data: any, socket: any, io: any) =>{
    const {connUserSocketId} = data;

    const initData = {
        connUserSocketId: socket.id
    }
    console.log("initialized connection handleer.......", initData)
    io.to(connUserSocketId).emit("conn-init", initData);
    console.log("conn-init event emiited to------------", connUserSocketId);
}