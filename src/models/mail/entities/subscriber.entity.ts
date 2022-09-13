import { User } from "@models/mail/entities/user.entity";

export class Subscriber {
  id: string;
  name: string;
  email: string;
  sender?: User;
  senderId: string;
}