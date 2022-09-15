import { Injectable } from "@nestjs/common";
import { IUserRepository } from "@mail/repository";
import { Subscriber, User } from "@models/mail/entities";
import { Role } from "@models/mail/enums";

@Injectable()
export class DummyExampleRepository implements IUserRepository {
  create(data: any): Promise<User> {
    return Promise.resolve({
      id: '1',
      username: 'test',
      email: 'test@tes.com',
      role: Role.USER,
      password: 'password',
      subscribers: [],
      mails: [],
    });
  }

  deleteById(id: User["id"]): Promise<User> {
    return Promise.resolve(undefined);
  }

  deleteMany(where: any): Promise<User[]> {
    return Promise.resolve([]);
  }

  deleteOne(where: any): Promise<User> {
    return Promise.resolve(undefined);
  }

  findAll(): Promise<User[]> {
    return Promise.resolve([]);
  }

  findById(id: User["id"]): Promise<User> {
    return Promise.resolve(undefined);
  }

  findMany(where: any, query: any): Promise<User[]> {
    return Promise.resolve([]);
  }

  findOne(where: any, query: any): Promise<User> {
    return Promise.resolve(undefined);
  }

  update(id: User["id"], data: any): Promise<User> {
    return Promise.resolve(undefined);
  }

  updateMany(where: any, data: any): Promise<User[]> {
    return Promise.resolve([]);
  }

  existsEmail(email: string): Promise<boolean> {
    return Promise.resolve(false);
  }

  existsUsername(username: string): Promise<boolean> {
    return Promise.resolve(false);
  }

  findAllSubscribers(userId: string): Promise<Subscriber[]> {
    return Promise.resolve([]);
  }

  findByUsername(username: string): Promise<User> {
    return Promise.resolve(undefined);
  }

}