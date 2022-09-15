import { UserController } from "@mail/controller";
import { IMailService, IUserService, MailService, UserService } from "@mail/service";
import { IMailRepository, IUserRepository, MailRepository } from "@mail/repository";
import { DummyExampleRepository } from "../dummies";
import { Test, TestingModule } from "@nestjs/testing";
import { User } from "@models/mail/entities";
import { RegisterUserDto } from "@models/mail/dto";
import { Role } from "@models/mail/enums";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { IMailProvider, NodemailerProvider } from "@mail/providers";
import { SharedModule } from "@shared/shared.module";

describe('UserController Unit Test', () => {
  let userController: UserController;
  let userService: IUserService;

  beforeEach(async () => {
    const userServiceProvider = {
      provide: IUserService,
      useClass: UserService,
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
        signOptions: {expiresIn: '60m'}
      }),
      SharedModule],
      controllers: [UserController],
      providers: [
        userRepositoryProvider,
        userServiceProvider,
        mailRepositoryProvider,
        mailProvider,
      ]
    }).compile()

    userController = app.get<UserController>(UserController);
    userService = app.get<IUserService>(IUserService);
  })

  describe('register', () => {
    it("should register user", async() => {
      const newUser: User = {
        id: '1',
        username: 'test',
        email: 'test@tes.com',
        role: Role.USER,
        password: 'password',
        subscribers: [],
        mails: [],
      }
      const input: RegisterUserDto = {
        username: 'test',
        email: 'test@test.com',
        password: 'password',
        role: Role.USER,
      }

      jest.spyOn(userService,'register').mockImplementation(() => Promise.resolve(newUser))
      const result = await userController.register(input);
      expect(result).toEqual(newUser)
    });
  })


})