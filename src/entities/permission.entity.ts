import { Entity, Column, OneToMany } from 'typeorm';
import AbstractEntity from './abstract.entity';
import RolePermission from './role_permission.entity';

@Entity()
export class Permission extends AbstractEntity {
  @Column({ unique: true })
  name!: string;

  @OneToMany(() => RolePermission, (rp) => rp.permission)
  rolePermissions!: RolePermission[];
}

export default Permission;
