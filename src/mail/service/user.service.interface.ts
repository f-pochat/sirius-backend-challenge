import { Subscriber, User } from "@models/mail/entities";
import { LoginUserDto, RegisterUserDto } from "@models/mail/dto";
import { Stats } from "@models/mail/entities/stats.entity";

export abstract class IUserService {
  abstract register(registerUserDto: RegisterUserDto): Promise<User>
  abstract login(loginUserDto: LoginUserDto): Promise<{ access_token: string }>
  abstract getSubscribers(user: User): Promise<Subscriber[]>
  abstract getStats(): Promise<Stats[]>

}
