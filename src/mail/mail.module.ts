import { SharedModule } from "@shared/shared.module";
import { Module } from "@nestjs/common";
import { MailController, SubscriberController, UserController } from "@mail/controller";
import {
  IMailRepository,
  ISubscriberRepository,
  IUserRepository, MailRepository,
  SubscriberRepository,
  UserRepository
} from "@mail/repository";
import {
  IMailService,
  ISubscriberService,
  IUserService, MailService,
  SubscriberService,
  UserService
} from "@mail/service";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "@shared/service/jwt.strategy";
import { IMailProvider, MailgunProvider, NodemailerProvider } from "@mail/providers";

const userRepositoryProvider = {
  provide: IUserRepository,
  useClass: UserRepository
};

const userServiceProvider = {
  provide: IUserService,
  useClass: UserService,
};

const subscriberServiceProvider = {
  provide: ISubscriberService,
  useClass: SubscriberService
}

const subscriberRepositoryProvider = {
  provide: ISubscriberRepository,
  useClass: SubscriberRepository,
}

const mailServiceProvider = {
  provide: IMailService,
  useClass: MailService
}

const mailgunProvider = {
  provide: IMailProvider,
  useClass: MailgunProvider,
}

const nodemailProvider = {
  provide: IMailProvider,
  useClass: NodemailerProvider,
}

const mailRepository = {
  provide: IMailRepository,
  useClass: MailRepository,
}

@Module({
  imports: [SharedModule,
  JwtModule.register({
    secret: 'secrecy',
    signOptions: {expiresIn: '60m'}
  })],
  controllers: [UserController, SubscriberController, MailController],
  providers: [userRepositoryProvider,
    userServiceProvider,
    subscriberServiceProvider,
    subscriberRepositoryProvider,
    mailServiceProvider,
    nodemailProvider,
    mailRepository,
    JwtStrategy]
})

export class MailModule {}
