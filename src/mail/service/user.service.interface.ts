import { Mail, Subscriber, User } from "@models/mail/entities";
import { LoginUserDto, RegisterUserDto } from "@models/mail/dto";

export abstract class IUserService {
  abstract register(registerUserDto: RegisterUserDto): Promise<User>
  abstract login(loginUserDto: LoginUserDto): Promise<{ access_token: string }>
  abstract getSubscribers(user: User): Promise<Subscriber[]>
  abstract getStats(): Promise<{ activeUsers: User[], mails: Mail[] }>

}