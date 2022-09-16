import { AddSubscriberDto } from "@models/mail/dto";
import { Subscriber, User } from "@models/mail/entities";

export abstract class ISubscriberService {
  abstract addSubscriber(addSubscriberDto: AddSubscriberDto, user: User): Promise<Subscriber>
  abstract deleteSubscriber(subscriberId: String, req: User)
}