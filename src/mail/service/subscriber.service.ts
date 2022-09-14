import { Inject, Injectable } from "@nestjs/common";
import { ISubscriberRepository, IUserRepository } from "@mail/repository";
import { ISubscriberService } from "@mail/service/subscriber.service.interface";
import { AddSubscriberDto } from "@models/mail/dto";
import { Subscriber, User } from "@models/mail/entities";
import { ForbiddenError, NotFoundError } from "@shared/errors";
import { Role } from "@models/mail/enums";

@Injectable()
export class SubscriberService implements ISubscriberService {
  constructor(@Inject(ISubscriberRepository) private readonly repository: ISubscriberRepository) {}

  async addSubscriber(addSubscriberDto: AddSubscriberDto, req: User): Promise<Subscriber> {
    return this.repository.create({
      ...addSubscriberDto,
      senderId: req.id,
    });
  }

  async deleteSubscriber(subscriberId: String, user: User) {
    const subscriber = await this.repository.findOne({id:subscriberId})
    if (!subscriber) throw new NotFoundError('Subscriber')
    console.log(user.id)
    console.log(subscriber.senderId)
    if (subscriber.senderId !== user.id && user.role !== Role.ADMIN) throw new ForbiddenError()

    await this.repository.deleteOne({
      id: subscriberId
    })
  }
}