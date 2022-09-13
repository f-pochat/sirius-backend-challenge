import { Body, Controller, Inject, Post, UseGuards } from "@nestjs/common";
import { IUserService } from "@mail/service";
import { User } from "@models/mail/entities";
import { LoginUserDto, RegisterUserDto } from "@models/mail/dto";
import { AuthGuard } from "@nestjs/passport";
import { RoleGuard } from "@shared/guards/role.guard";
import { Role } from "@models/mail/enums";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller('user')
export class UserController {
  constructor(@Inject(IUserService) private readonly userService:IUserService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'),RoleGuard(Role.ADMIN))
  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto): Promise<User> {
    return await this.userService.register(registerUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<{ access_token: string }> {
    return await this.userService.login(loginUserDto);
  }
}
