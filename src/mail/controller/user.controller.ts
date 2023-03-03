import { Body, Controller, Get, Inject, Post, Request, UseGuards } from "@nestjs/common";
import { IUserService } from "@mail/service";
import { User } from "@models/mail/entities";
import { LoginUserDto, RegisterUserDto } from "@models/mail/dto";
import { AuthGuard } from "@nestjs/passport";
import { RoleGuard } from "@shared/guards/role.guard";
import { Role } from "@models/mail/enums";
import { ApiBearerAuth } from "@nestjs/swagger";
import { Stats } from "@models/mail/entities/stats.entity";

@Controller('user')
export class UserController {
  constructor(@Inject(IUserService) private readonly userService:IUserService) {}

  @ApiBearerAuth()
  // @UseGuards(AuthGuard('jwt'),RoleGuard(Role.ADMIN))
  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto): Promise<User> {
    return await this.userService.register(registerUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<{ access_token: string }> {
    return await this.userService.login(loginUserDto);
  }


  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('subscriber')
  async getSubscribers(@Request() req){
    return await this.userService.getSubscribers(req.user)
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'),RoleGuard(Role.ADMIN))
  @Get('stats')
  async getStats() : Promise<Stats[]> {
    return await this.userService.getStats()
  }
}
