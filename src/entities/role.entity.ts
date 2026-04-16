import { Entity, Column, OneToMany } from 'typeorm';
import AbstractEntity from './abstract.entity';
import RolePermission from './role_permission.entity';
import UserRoles from './user_roles';

@Entity('roles')
export class Role extends AbstractEntity {
  @Column({ unique: true })
  name!: string;

  @OneToMany(() => RolePermission, (rp) => rp.role)
  rolePermissions!: RolePermission[];

  @OneToMany(() => UserRoles, (userRole) => userRole.role)
  userRoles!: UserRoles[];
}
export default Role;
