import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from './auth/auth.module';
import * as Joi from 'joi';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RolesModule } from './roles/roles.module';
import { AddressesModule } from './addresses/addresses.module';
import { CustomersModule } from './customers/customers.module';
import { HttpExceptionFilter } from 'src/filter/http-exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
      }),
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    RolesModule,
    AddressesModule,
    CustomersModule,
  ],

  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_FILTER, useValue: new HttpExceptionFilter() },
  ],
})
export class AppModule {}
