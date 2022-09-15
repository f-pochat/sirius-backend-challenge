import { MailController, UserController } from "@mail/controller";
import { IMailService, IUserService, MailService, UserService } from "@mail/service";
import { IMailRepository, IUserRepository, MailRepository } from "@mail/repository";
import { DummyExampleRepository } from "../dummies";
import { IMailProvider, NodemailerProvider } from "@mail/providers";
import { Test, TestingModule } from "@nestjs/testing";
import { JwtModule } from "@nestjs/jwt";
import { SharedModule } from "@shared/shared.module";
import { Mail, User } from "@models/mail/entities";
import { Role } from "@models/mail/enums";
import { RegisterUserDto } from "@models/mail/dto";
import { SendMailsDto } from "@models/mail/dto/send-mails.dto";

describe('MailController Unit Test', () => {
  let mailController: MailController;
  let mailService: IMailService;
  let mailRepository: IMailRepository;

  beforeEach(async () => {
    const mailServiceProvider = {
      provide: IMailService,
      useClass: MailService,
    }

    const userRepositoryProvider = {
      provide: IUserRepository,
      useClass: DummyExampleRepository,
    }

    const mailRepositoryProvider = {
      provide: IMailRepository,
      useClass: MailRepository
    }

    const mailProvider = {
      provide: IMailProvider,
      useClass: NodemailerProvider,
    }

    const app: TestingModule = await Test.createTestingModule({
      imports: [JwtModule.register({
        secret: 'secrecy',
        signOptions: { expiresIn: '60m' }
      }),
        SharedModule],
      controllers: [MailController],
      providers: [
        userRepositoryProvider,
        mailServiceProvider,
        mailRepositoryProvider,
        mailProvider,
      ]
    }).compile()

    mailController = app.get<MailController>(MailController);
    mailService = app.get<IMailService>(IMailService);
    mailRepository = app.get<IMailRepository>(IMailRepository)
  })

  describe('Send more than 1000 mails', () => {
    it("should throw error", async () => {
      const user: User = {
        id: '1',
        username: 'test',
        email: 'test@tes.com',
        role: Role.USER,
        password: 'password',
        subscribers: [],
        mails: [],
      }

      const mail: Mail = {
        id: '1',
        date: new Date(Date.now()),
        senderId: '1',
        subscriberId: '2',
        subject: 'Hola',
        body: 'chau',
      }

      const sendMailsDto: SendMailsDto = {
        subject: 'Hola',
        body: 'Chau',
      }


      jest.spyOn(mailRepository, 'findDailyMails').mockImplementation(() => Promise.resolve(Array(1000).fill(mail)));

      try {
        await mailService.sendMails(sendMailsDto, user);
      } catch (error) {
        expect(error.message).toBe(`Already sent more than 1000 mails`);
      }
    });
  })
})
