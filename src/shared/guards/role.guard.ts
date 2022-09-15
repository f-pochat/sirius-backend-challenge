import { CanActivate, ExecutionContext, mixin, Type } from "@nestjs/common";
import { Role } from "@models/mail/enums";
import { Observable } from "rxjs";

export const RoleGuard = (role: Role): Type<CanActivate> => {
  class RoleGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
      const { user } = context.switchToHttp().getRequest();
      return user.role === role
    }
  }
  return mixin(RoleGuardMixin);
};