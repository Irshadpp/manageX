
export const signalingHandler = (data:any, socket: any, io: any) =>{
     const { connUserSocketId, signal } = data;  // Ensure this extracts the correct values
    console.log("connUserSocketId=======================>", data);

    const signalingData = { signal, connUserSocketId: socket.id };
    io.to(connUserSocketId).emit("conn-signal", signalingData); 
    // console.log("conn-signal event emited from----------->", connUserSocketId,"with signal data==========>", signalingData)
}