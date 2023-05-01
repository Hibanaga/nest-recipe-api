import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeModule } from './src/modules/recipe/recipe.module';
import {
  Ingredient,
  Recipe,
} from './src/modules/recipe/entities/recipe.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validate } from './src/config/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [Recipe, Ingredient],
        synchronize: configService.get<boolean>('DB_SYNCHRONIZATION') || false,
        logging: configService.get<boolean>('DB_LOGGING') || false,
      }),
    }),
    RecipeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
