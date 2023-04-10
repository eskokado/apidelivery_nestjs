import { Body, Controller, Post } from '@nestjs/common';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthService } from './auth.service';
import { ApiBody } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  @ApiBody({ type: AuthLoginDto })
  async login(@Body() body: AuthLoginDto) {
    return await this.authService.login(body.username, body.password);
  }
}
