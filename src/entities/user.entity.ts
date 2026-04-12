import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import AbstractEntity from './abstract.entity';
import { Role } from './role.entity';
import { Exclude } from 'class-transformer';

@Entity('users')
export class User extends AbstractEntity {
  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  // @Exclude({ toPlainOnly: true })
  @Column({ select: false })
  password!: string;

  @ManyToOne(() => Role, (role) => role.users, {
    eager: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'role_id' })
  role!: Role;
}

export default User;
