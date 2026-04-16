import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import User from '../entities/user.entity';
import { UsersRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import Role from '../entities/role.entity';
import UserRoles from '../entities/user_roles';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, UserRoles])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
