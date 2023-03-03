import { Injectable } from "@nestjs/common";
import { BaseRepository } from "@shared/repository";
import { IUserRepository } from "@mail/repository/user.repository.interface";
import { DatabaseService } from "@shared/service";
import { Subscriber, User } from "@models/mail/entities";
import { Stats } from "@models/mail/entities/stats.entity";
import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient();

@Injectable()
export class UserRepository extends BaseRepository<User> implements IUserRepository {
  constructor(db: DatabaseService) {
    super(db, 'user');
  }

  async existsEmail(email: string): Promise<boolean> {
    const foundEmail = await this.findOne(
      {email: email}
    );
    return !!foundEmail;
  }

  async existsUsername(username: string): Promise<boolean> {
    const foundUsername = await this.findOne(
      {username: username}
    );
    return !!foundUsername;
  }

  async findByUsername(username: string): Promise<User> {
    return await this.findOne(
      {username: username}
    )
  }

  async findAllSubscribers(userId: String) : Promise<Subscriber[]>{
    const users =  await this.findOne(
      {id: userId},
      {
      select: {
        subscribers: true,
      }
    })

    return users.subscribers
  }

  async getStats(): Promise<Stats[]> {
    return prisma.$queryRaw`SELECT username, count(m.id)  from "User" u join "Mail" m on u.id=m."senderId" where cast(m.date as date) = cast(CURRENT_DATE as date) group by username;`
  }
}
