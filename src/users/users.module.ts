import { MongooseModule } from '@nestjs/mongoose';
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserSchema } from './schemas/user.schema';
import { UsersController } from './users.controller';

@Module({
    imports: [
      MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService] // Exporta UsersService si otros módulos lo necesitan
  })
  export class UsersModule {}
