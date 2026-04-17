import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import User from '../entities/user.entity';
import { UsersRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import Role from '../entities/role.entity';
import UserRoles from '../entities/user_roles';
import { BullModule } from '@nestjs/bullmq';
import { UserProcessor } from '../workers/user-processor';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, UserRoles]),
    BullModule.registerQueue({ name: 'user-queue' }),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, UserProcessor],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
