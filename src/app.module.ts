import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from '../orm.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import Role from './entities/role.entity';
import Permission from './entities/permission.entity';
import User from './entities/user.entity';
import AbstractEntity from './entities/abstract.entity';
import RolePermission from './entities/role_permission.entity';

const typeOrmConfig = ormConfig;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...typeOrmConfig,
      autoLoadEntities: true,
      entities: [Role, Permission, User, AbstractEntity, RolePermission],
    }),
    RolesModule,
    PermissionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
