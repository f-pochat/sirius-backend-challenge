import { Inject, Injectable } from "@nestjs/common";
import { IMailRepository, IUserRepository } from "@mail/repository";
import { AddSubscriberDto, LoginUserDto, RegisterUserDto } from "@models/mail/dto";
import { Mail, Subscriber, User } from "@models/mail/entities";
import { IUserService } from ".";
import { NotFoundError, NotUniqueError, ValidationError } from "@shared/errors";
import { comparePasswords, encryptPassword } from "@models/mail/util";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class UserService implements IUserService {
  constructor(
    private jwtService: JwtService,
    @Inject(IUserRepository) private readonly repository: IUserRepository,
    @Inject(IMailRepository) private readonly mailRepository: IMailRepository,
    ){}

  async login(loginUserDto: LoginUserDto): Promise<{ access_token: string }> {
    const user = await this.repository.findByUsername(loginUserDto.username);
    if (!user) throw new NotFoundError('User')
    if (!await comparePasswords(loginUserDto.password,user.password)) throw new ValidationError('user','password','is not the same')

    return {
      access_token: this.jwtService.sign({ id: user.id })
    }
  }

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    const existsEmail = await this.repository.existsEmail(registerUserDto.email);
    if (existsEmail) throw new NotUniqueError('Email')

    const existsUsername = await this.repository.existsUsername(registerUserDto.username);
    if (existsUsername) throw new NotUniqueError('Username')

    registerUserDto.password = await encryptPassword(registerUserDto.password);

    return await this.repository.create(registerUserDto);
  }

  async getSubscribers(user: User) : Promise<Subscriber[]> {
    return await this.repository.findAllSubscribers(user.id);
  }

  async getStats(): Promise<{
    activeUsers: User[],
    mails: Mail[],
  }> {
    const mails = await this.mailRepository.findAllDailyMails()
    const activeUsers = await Promise.all(mails.map(async mail => {
      return await this.repository.findById(mail.senderId)
    }))
    return {
      activeUsers: activeUsers,
      mails: mails,
    }
  }
}