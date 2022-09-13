import { Role } from "@models/mail/enums";
import { Mail, Subscriber } from "@models/mail/entities";

export class User {
  id: string;
  username: string;
  email: string;
  role: Role;
  password: string;
  subscribers: Subscriber[]
  mails: Mail[]
}