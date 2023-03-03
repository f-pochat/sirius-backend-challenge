import { IBaseRepository } from "@shared/repository";
import { Subscriber, User } from "@models/mail/entities";
import { Stats } from "@models/mail/entities/stats.entity";

export abstract class IUserRepository extends IBaseRepository<User> {
  abstract existsEmail(email: string): Promise<boolean>
  abstract existsUsername(username: string): Promise<boolean>
  abstract findByUsername(username: string): Promise<User>
  abstract findAllSubscribers(userId: string) : Promise<Subscriber[]>
  abstract getStats(): Promise<Stats[]>
}
