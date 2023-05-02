import { IsNotEmpty } from 'class-validator';

export class RefreshTokenAuthDto {
  @IsNotEmpty()
  refreshToken: string;
}
