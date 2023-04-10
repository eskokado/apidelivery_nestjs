import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UserPojo } from '../auth/user.pojo';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    try {
      const { authorization } = request.headers;
      const data = await this.authService.checkToken(
        (authorization ?? '').split(' ')[1],
      );
      request.user = UserPojo.findByUserName(data.id);
      return true;
    } catch (e) {
      return false;
    }
  }
}
