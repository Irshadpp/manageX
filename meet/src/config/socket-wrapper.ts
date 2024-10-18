// import { Socket, Server as SocketIoServer} from 'socket.io';
// import {app} from "../app";

// class SocketWrapper{
//     private _io?: SocketIoServer;

//     get io(){
//         if(!this._io){
//             throw new Error("Socket.io is not initialized");
//         }
//         return this._io
//     }

//     init(httpServer: any){
//         this._io = new SocketIoServer(httpServer, {
//             cors: {
//                 origin: process.env.CLIENT_URL,
//                 credentials: true
//             },
//         });
//         return this._io;
//     }
// }

// export const socketWrapper = new SocketWrapper();

import amqp from 'amqplib';
import { connectToRabbitMQ } from '@ir-managex/common';

class RabbitmqWrapper {
    private _channel: amqp.Channel | null = null;
    private _isConnecting = false;

    get channel() {
        if (!this._channel) throw new Error('Cannot access RabbitMQ channel before connecting!');
        return this._channel;
    }

    async connect(): Promise<void> {
        if (this._isConnecting) {
            console.log('Already trying to connect to RabbitMQ...');
            return;
        }

        this._isConnecting = true;

        try {
            this._channel = await connectToRabbitMQ();
            console.log('Meet RabbitMQ connected!');

            // Reconnection logic if the connection is closed
            this._channel.connection.on('close', () => {
                console.log('Meet RabbitMQ connection closed. Reconnecting...');
                this._channel = null;
                this.connect().catch((err) => console.error('Reconnection failed:', err));
            });

            this._isConnecting = false;
        } catch (error) {
            this._isConnecting = false;
            console.error('Meet RabbitMQ connection error:', error);
            // Attempt to reconnect after a delay
            const RECONNECT_DELAY = 5000;
            setTimeout(() => this.connect(), RECONNECT_DELAY);
        }
    }
}

export const rabbitmqWrapper = new RabbitmqWrapper();