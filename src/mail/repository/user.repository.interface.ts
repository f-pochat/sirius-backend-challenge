import { IBaseRepository } from "@shared/repository";
import { User } from "@models/mail/entities";

export abstract class IUserRepository extends IBaseRepository<User> {
  abstract existsEmail(email: String): Promise<boolean>
  abstract existsUsername(username: String): Promise<boolean>
  abstract findByUsername(username: String): Promise<User>
}