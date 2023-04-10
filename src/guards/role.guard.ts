import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../enum/role.enum';
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  async canActivate(context: ExecutionContext) {
    const requeridRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requeridRoles) return true;

    const { user } = context.switchToHttp().getRequest();

    const rolesFiltered = requeridRoles.filter((role) => role === user.role);

    if (rolesFiltered.length > 0) return true;
    return false;
  }
}
