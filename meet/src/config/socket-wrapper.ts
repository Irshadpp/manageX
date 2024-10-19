import { Socket, Server as SocketIoServer} from 'socket.io';
import {app} from "../app";

class SocketWrapper{
    private _io?: SocketIoServer;

    get io(){
        if(!this._io){
            throw new Error("Socket.io is not initialized");
        }
        return this._io
    }

    init(httpServer: any){
        this._io = new SocketIoServer(httpServer, {
            cors: {
                origin: process.env.CLIENT_URL,
                credentials: true
            },
        });
        return this._io;
    }
}

export const socketWrapper = new SocketWrapper();