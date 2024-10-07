import amqp from 'amqplib'
import { connectToRabbitMQ } from "@ir-managex/common";

class RabbitmqWrapper{
  private _channel: amqp.Channel | null = null;

  get channel(){
      if(!this._channel) throw new Error("Cannot access rabbitmq channel before accessing!");
      return this._channel;
  }

  async connect():Promise<void>{
    try {
      this._channel = await connectToRabbitMQ();
      console.log("Subscription Rabbitmq connected!!!");
    } catch (error) {
      console.log("Rabbitmq connection error ===========>",error);
    }
  }
}

export const rabbitmqWrapper = new RabbitmqWrapper();