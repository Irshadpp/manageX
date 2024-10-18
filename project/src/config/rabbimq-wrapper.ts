// import amqp from 'amqplib'
// import { connectToRabbitMQ } from "@ir-managex/common";

// class RabbitmqWrapper{
//   private _channel: amqp.Channel | null = null;

//   get channel(){
//       if(!this._channel) throw new Error("Cannot access rabbitmq channel before accessing!");
//       return this._channel;
//   }

//   async connect():Promise<void>{
//     try {
//       this._channel = await connectToRabbitMQ();
//       console.log("Project Rabbitmq connected!!!");
//     } catch (error) {
//       console.log("Rabbitmq connection error ===========>",error);
//     }
//   }
// }

// export const rabbitmqWrapper = new RabbitmqWrapper();


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
            console.log('Project RabbitMQ connected!');

            // Reconnection logic if the connection is closed
            this._channel.connection.on('close', () => {
                console.log('Project RabbitMQ connection closed. Reconnecting...');
                this._channel = null;
                this.connect().catch((err) => console.error('Reconnection failed:', err));
            });

            this._isConnecting = false;
        } catch (error) {
            this._isConnecting = false;
            console.error('Project RabbitMQ connection error:', error);
            // Attempt to reconnect after a delay
            const RECONNECT_DELAY = 5000;
            setTimeout(() => this.connect(), RECONNECT_DELAY);
        }
    }
}

export const rabbitmqWrapper = new RabbitmqWrapper();