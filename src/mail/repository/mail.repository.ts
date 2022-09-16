import { BaseRepository } from "@shared/repository";
import { IMailRepository } from "@mail/repository/mail.repository.interface";
import { DatabaseService } from "@shared/service";
import { Mail } from "@models/mail/entities";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MailRepository extends BaseRepository<Mail> implements IMailRepository {
  constructor(db: DatabaseService) {
    super(db, 'mail');
  }

  async findDailyMails(senderId: string): Promise<Mail[]> {
    const today = new Date(Date.now() - (24 * 60 * 60 * 1000)).toISOString()

    return await this.findMany({
      AND: [
        {senderId: senderId},
        {date: {gte: today}},
      ]
    })
  }

  async findAllDailyMails(): Promise<Mail[]> {
    const today = new Date(Date.now() - (24 * 60 * 60 * 1000)).toISOString()

    return await this.findMany({
      date:{
        gte: today,
      }
    })
  }
}