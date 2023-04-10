import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from "./auth.controller";
import { UserPojo } from "./user.pojo";
import { AuthService } from "./auth.service";

@Module({
  imports: [
    JwtModule.register({
      secret: 'mysecret',
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
