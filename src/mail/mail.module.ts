import { SharedModule } from "@shared/shared.module";
import { Module } from "@nestjs/common";
import { SubscriberController, UserController } from "@mail/controller";
import { ISubscriberRepository, IUserRepository, SubscriberRepository, UserRepository } from "@mail/repository";
import { ISubscriberService, IUserService, SubscriberService, UserService } from "@mail/service";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "@shared/service/jwt.strategy";

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


@Module({
  imports: [SharedModule,
  JwtModule.register({
    secret: 'secrecy',
    signOptions: {expiresIn: '60m'}
  })],
  controllers: [UserController, SubscriberController],
  providers: [userRepositoryProvider,
    userServiceProvider,
    subscriberServiceProvider,
    subscriberRepositoryProvider,
    JwtStrategy]
})

export class MailModule {}
