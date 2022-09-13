import { Inject, Injectable } from "@nestjs/common";
import { Strategy } from "passport-jwt";
import { IUserRepository } from "@mail/repository";
import { ExtractJwt } from "passport-jwt";
import { ForbiddenError } from "@shared/errors";
import { PassportStrategy } from "@nestjs/passport";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(@Inject(IUserRepository) private readonly repository: IUserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secrecy',
    });
  }

  async validate(payload: any) {
    const id = payload.id;
    const user = await this.repository.findOne({ id: id });
    if (!user) throw new ForbiddenError();
    return user;
  }
}