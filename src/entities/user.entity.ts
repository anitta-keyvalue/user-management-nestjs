import { Entity, Column, OneToMany } from 'typeorm';
import AbstractEntity from './abstract.entity';
import UserRoles from './user_roles';

@Entity('users')
export class User extends AbstractEntity {
  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ select: false })
  password!: string;

  @Column()
  refreshtoken!: string;

  @OneToMany(() => UserRoles, (userRole) => userRole.user)
  userRoles!: UserRoles[];
}

export default User;
