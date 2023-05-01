import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  validateSync,
} from 'class-validator';
import { plainToInstance } from 'class-transformer';

class EnviromentVariables {
  @IsNotEmpty()
  @IsNumber()
  APP_PORT: number;

  @IsNotEmpty()
  @IsString()
  DB_PASSWORD: string;

  @IsNotEmpty()
  @IsString()
  DB_USERNAME: string;

  @IsNotEmpty()
  @IsString()
  DB_NAME: string;

  @IsNotEmpty()
  @IsNumber()
  DB_PORT: number;

  @IsNotEmpty()
  @IsString()
  DB_HOST: string;

  @IsNotEmpty()
  @IsBoolean()
  DB_LOGGING: boolean;

  @IsNotEmpty()
  @IsBoolean()
  DB_SYNCHRONIZATION: boolean;
}

export function validate(config: Record<string, any>) {
  const validationConfig = plainToInstance(EnviromentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validationConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validationConfig;
}
