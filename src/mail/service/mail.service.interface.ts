import { Mail, Subscriber, User } from "@models/mail/entities";
import { SendMailsDto } from "@models/mail/dto/send-mails.dto";

export abstract class IMailService {
  abstract sendMails(sendMailsDto: SendMailsDto, user: User): Promise<string>
}