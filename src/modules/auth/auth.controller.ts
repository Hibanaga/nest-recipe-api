import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RefreshTokenAuthDto } from './dto/refresh-token-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginAuthDto) {
    return this.authService.single(body);
  }

  @Post('register')
  async register(@Body() body: RegisterAuthDto) {
    return this.authService.create(body);
  }

  @Post('refresh-token')
  async refreshToken(@Body() { refreshToken }: RefreshTokenAuthDto) {
    return this.authService.refreshToken(refreshToken);
  }
}
