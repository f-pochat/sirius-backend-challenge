import { Subscriber, User } from "@models/mail/entities";

export abstract class IMailProvider {
  abstract sendMails(subject: string, body: string, user:User, subscribers: Subscriber[]): Promise<string>;
}