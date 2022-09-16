import { IBaseRepository } from "@shared/repository";
import { Mail } from "@models/mail/entities";

export abstract class IMailRepository extends IBaseRepository<Mail> {
  abstract findDailyMails(senderId: string): Promise<Mail[]>
  abstract findAllDailyMails():Promise<Mail[]>
}