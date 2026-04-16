import { Entity, ManyToOne, JoinColumn } from 'typeorm';
import AbstractEntity from './abstract.entity';
import { Role } from './role.entity';
import User from './user.entity';

@Entity('user_roles')
export class UserRoles extends AbstractEntity {
  @ManyToOne(() => Role, (role) => role.userRoles, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'role_id' })
  role!: Role;

  @ManyToOne(() => User, (user) => user.userRoles, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user!: User;
}

export default UserRoles;
