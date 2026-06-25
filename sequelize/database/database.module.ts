import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { Dialect } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import models from '../models';

@Global()
@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService): SequelizeModuleOptions => {
        const dialect = config.getOrThrow<Dialect>('DB_DIALECT');

        return {
          dialect,
          host: config.get<string>('DB_HOST'),
          port: +config.getOrThrow<number>('DB_PORT'),
          username: config.getOrThrow<string>('DB_USER'),
          password: config.getOrThrow<string>('DB_PASSWORD'),
          database: config.getOrThrow<string>('DB_NAME'),
          logging: config.getOrThrow<string>('DB_LOGGING') === 'true',
          synchronize: config.getOrThrow<string>('DB_SYNC') === 'true',
          autoLoadModels: true,
          models,
        };
      },
    }),
  ],
  providers: [
    {
      provide: 'SEQUELIZE',
      useFactory: (sequelize: Sequelize) => sequelize,
      inject: [Sequelize],
    },
  ],
  exports: [SequelizeModule, 'SEQUELIZE'],
})
export default class DatabaseModule {}
