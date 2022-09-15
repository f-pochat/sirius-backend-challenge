import { Body, Controller, Inject, Post, UseGuards, Request, Delete, Param, Get } from "@nestjs/common";
import { Subscriber, User } from "@models/mail/entities";
import { AddSubscriberDto} from "@models/mail/dto";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth } from "@nestjs/swagger";
import { ISubscriberService } from "@mail/service/subscriber.service.interface";

@Controller('subscriber')
export class SubscriberController {
  constructor(@Inject(ISubscriberService) private readonly subscriberService:ISubscriberService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('add')
  async addSubscriber(@Body() addSubscriberDto: AddSubscriberDto,
                      @Request() req: any): Promise<Subscriber> {
    return await this.subscriberService.addSubscriber(addSubscriberDto, req.user);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
  async deleteSubscriber(@Param('id') subscriberId: String, @Request() req) {
    return await this.subscriberService.deleteSubscriber(subscriberId, req.user)
  }
}
