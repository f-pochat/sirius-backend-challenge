import { Body, Controller, Inject, Post, Request, UseGuards } from "@nestjs/common";
import { IMailService } from "@mail/service";
import { ApiBearerAuth } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { SendMailsDto } from "@models/mail/dto/send-mails.dto";

@Controller('mail')
export class MailController {
  constructor(@Inject(IMailService) private readonly mailService:IMailService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('send')
  async sendMails(@Body() sendMailsDto: SendMailsDto,
                      @Request() req: any) {
    return await this.mailService.sendMails(sendMailsDto, req.user);
  }
}