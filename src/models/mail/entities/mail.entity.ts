import { User } from "@models/mail/entities/user.entity";
import { Subscriber } from "@models/mail/entities/subscriber.entity";

export class Mail {
  id: string;
  sender?: User;
  senderId: string;
  subscriber?: Subscriber;
  subscriberId: string;
  body: string;
}