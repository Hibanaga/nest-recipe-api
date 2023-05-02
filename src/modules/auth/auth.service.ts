import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './entities/user.entity';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async single(loginDto: LoginAuthDto) {
    return 'login route';
  }

  async create(registerDto: RegisterAuthDto) {
    const existingUser = await this.userRepository.findOne({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new HttpException(
        'Email already registered!',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.userRepository.create({
      email: registerDto.email,
      password: registerDto.password,
      role: UserRole.User,
    });

    return 'register route';
  }

  async refreshToken(refreshToken: string) {
    return 'refresh token route';
  }
}
