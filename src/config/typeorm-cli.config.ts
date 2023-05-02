import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Ingredient, Recipe } from 'src/modules/recipe/entities/recipe.entity';
import { InitialSchema1682934536468 } from '../migrations/1682934536468-initial-schema';
import { CreateTableUser1683009584101 } from '../migrations/1683009584101-create-table-user';
import { User } from '../modules/auth/entities/user.entity';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  logging: configService.get<boolean>('DB_LOGGING'),
  entities: [Recipe, Ingredient, User],
  migrations: [InitialSchema1682934536468, CreateTableUser1683009584101],
});
