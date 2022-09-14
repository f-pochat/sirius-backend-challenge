import { IBaseRepository } from "@shared/repository";
import { Subscriber, User } from "@models/mail/entities";

export abstract class ISubscriberRepository extends IBaseRepository<Subscriber> {
}