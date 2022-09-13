import { SharedModule } from "@shared/shared.module";
import { Module } from "@nestjs/common";
import { UserController } from "@mail/controller";
import { IUserRepository, UserRepository } from "@mail/repository";
import { IUserService, UserService } from "@mail/service";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { JwtStrategy } from "@shared/service/jwt.strategy";

const userRepositoryProvider = {
  provide: IUserRepository,
  useClass: UserRepository
};

const userServiceProvider = {
  provide: IUserService,
  useClass: UserService,
};

@Module({
  imports: [SharedModule,
  JwtModule.register({
    secret: 'secrecy',
    signOptions: {expiresIn: '60m'}
  })],
  controllers: [UserController],
  providers: [userRepositoryProvider, userServiceProvider, JwtStrategy]
})

export class MailModule {}
