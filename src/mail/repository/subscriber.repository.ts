import { Injectable } from "@nestjs/common";
import { BaseRepository } from "@shared/repository";
import { Subscriber, User } from "@models/mail/entities";
import { DatabaseService } from "@shared/service";
import { ISubscriberRepository } from "@mail/repository/subscriber.repository.interface";

@Injectable()
export class SubscriberRepository extends BaseRepository<Subscriber> implements ISubscriberRepository {
  constructor(db: DatabaseService) {
    super(db, 'subscriber');
  }
}
