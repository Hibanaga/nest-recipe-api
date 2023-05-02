import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './entities/user.entity';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

export interface JWTTokens {
  token: string;
  refreshToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async single(loginDto: LoginAuthDto) {
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new HttpException('Invalid credentials!', HttpStatus.BAD_REQUEST);
    }

    const validPassword = await compare(loginDto.password, user.password);

    if (!validPassword) {
      throw new HttpException('Invalid credentials!', HttpStatus.BAD_REQUEST);
    }

    return this.getTokens(user);
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

    const protectedPassword = await this.hashPassword(registerDto.password);

    return this.userRepository.save({
      email: registerDto.email,
      password: protectedPassword,
      role: (registerDto?.role as UserRole) || UserRole.User,
    });
  }

  async refreshToken(refreshToken: string) {
    try {
      const { sub: email } = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      });

      const user = await this.userRepository.findOneOrFail({
        where: { email },
      });

      return this.getTokens(user);
    } catch (error) {
      throw new HttpException(
        'Email already registered!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private hashPassword(password: string): Promise<string> {
    return hash(password, 4);
  }

  private async getTokens(user: User): Promise<JWTTokens> {
    const [token, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: user.email,
          role: user.role,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
          expiresIn: this.configService.get<string>(
            'JWT_ACCESS_TOKEN_EXPIRATION',
          ),
        },
      ),
      this.jwtService.signAsync(
        {
          sub: user.email,
          role: user.role,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
          expiresIn: this.configService.get<string>(
            'JWT_REFRESH_TOKEN_EXPIRATION',
          ),
        },
      ),
    ]);

    return {
      token,
      refreshToken,
    };
  }
}
