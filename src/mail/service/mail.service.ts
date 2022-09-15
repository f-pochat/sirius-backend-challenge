import { Inject, Injectable } from "@nestjs/common";
import { IMailService } from "@mail/service/mail.service.interface";
import { SendMailsDto } from "@models/mail/dto/send-mails.dto";
import { User } from "@models/mail/entities";
import { IMailProvider } from "@mail/providers";
import { IMailRepository, IUserRepository } from "@mail/repository";
import {PrismaClient} from "@prisma/client";
import { MailLimitError } from "@shared/errors";
const prisma = new PrismaClient();

@Injectable()
export class MailService implements IMailService {
  constructor(
    @Inject(IMailProvider) private readonly emailProvider: IMailProvider,
    @Inject(IUserRepository) private readonly userRepository: IUserRepository,
    @Inject(IMailRepository) private readonly mailRepository: IMailRepository,
    ) {}

  async sendMails(sendMailsDto: SendMailsDto, user: User): Promise<string> {
    const subscribers = await this.userRepository.findAllSubscribers(user.id);
    const dailyMails = await this.mailRepository.findDailyMails(user.id);
    if (dailyMails.length >= 1000) throw new MailLimitError(1000)
    await prisma.$transaction(subscribers.map(sub => {
      return prisma.mail.create({
        data: {
          senderId: user.id,
          subscriberId: sub.id,
          ...sendMailsDto
        }
      })
    }))

    return this.emailProvider.sendMails(sendMailsDto.subject, sendMailsDto.body, user, subscribers)
  }
}
