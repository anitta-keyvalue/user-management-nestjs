import { Entity, Column, OneToMany } from 'typeorm';
import AbstractEntity from './abstract.entity';
import User from './user.entity';
import RolePermission from './role_permission.entity';

@Entity('roles')
export class Role extends AbstractEntity {
  @Column({ unique: true })
  name!: string;

  @OneToMany(() => User, (user) => user.role)
  users!: User[];

  @OneToMany(() => RolePermission, (rp) => rp.role)
  rolePermissions!: RolePermission[];
}
export default Role;
