import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LoggerModule } from 'nestjs-pino';
import { BrandsModule } from './brands/brands.module';

import dbConfig from './config/db.config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      ...dbConfig,
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
            colorize: true,
            levelFirst: true,
          },
        },
      },
    }),
    BrandsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
