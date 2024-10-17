import { io } from "socket.io-client";
import * as webRTCHandler from "./webRTCHandler";
import store from "@/store";
import { setParticipants, setRoomId } from "@/store/meetSlice";

const server = "http://localhost:8000"
// const server = " http://managex.online"
// const server = "https://1z0cd2xj-8000.inc1.devtunnels.ms"

let socket: any;
export const connectWithSocketIOServer = () =>{

     socket = io(server);
    socket.on("connect", () =>{
        console.log("Successfully connected with socket io server with id:", socket.id);
    });

    socket.on('room-id', ({roomId}: any) =>{
        store.dispatch(setRoomId(roomId))
    });

    socket.on('room-updated', ({connectedUsers}: any) =>{
        console.log('room updated listener called')
        console.log(connectedUsers, "updated.........")
        store.dispatch(setParticipants(connectedUsers));
    });

    socket.on('conn-prepare', ({connUserSocketId}:any) =>{
        console.log("0--00--0-0-0==-0=-===========>", connUserSocketId)
        webRTCHandler.prepareNewPeerConnection(connUserSocketId, false)

        //inform the user which just join the room that we are perpared for incoming connection
        socket.emit('conn-init', {connUserSocketId: connUserSocketId})
    })

    socket.on('conn-signal', (data: any) =>{
        console.log("conn-signal event recieved on client.............", data)
        webRTCHandler.handleSignalingDatam(data);
    })

    socket.on('conn-init', (data: any) =>{
        const {connUserSocketId} = data;
        console.log("conn-init event recived from server..............", connUserSocketId)
        webRTCHandler.prepareNewPeerConnection(connUserSocketId, true);
        console.log("connection prepared for initiator...........")
    });

    socket.on("user-disconnected", (data: any) =>{
        webRTCHandler.removePeerConnection(data);
    })
}

export const createNewRoom = (identity: string, onlyAudio: boolean) =>{
    const data = {
        identity,
        onlyAudio
    }
    socket.emit("create-new-room", data)
}

export const joinRoom = (identity: string, roomId: string, onlyAudio: boolean) =>{
    const data = {
        identity,
        roomId,
        onlyAudio
    }

    console.log("event emited to join-room with data=========>", data)
    socket.emit("join-room", data)
}

export const signalPeerData = (data: any) =>{
    socket.emit("conn-signal", data)
}
