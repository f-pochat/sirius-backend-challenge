import { User } from "@models/mail/entities";
import { LoginUserDto, RegisterUserDto } from "@models/mail/dto";

export abstract class IUserService {
  abstract register(registerUserDto: RegisterUserDto): Promise<User>
  abstract login(loginUserDto: LoginUserDto): Promise<{ access_token: string }>
}