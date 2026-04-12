import { DataSource, DeleteResult, Repository } from 'typeorm';
import HttpException from '../execeptions/httpException';
import { Injectable } from '@nestjs/common';
import User from '../entities/user.entity';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.findOne({
      where: { email: email.trim() },
      select: {
        id: true,
        email: true,
        password: true, // 🔓 Explicitly "unmasking" it here
        name: true,
      },
      relations: [
        'role',
        'role.rolePermissions',
        'role.rolePermissions.permission',
      ],
    });
    return user;
  }

  async findById(id: number): Promise<User | null> {
    return await this.findOneBy({ id });
  }

  async getAll(): Promise<User[]> {
    return await this.find();
  }

  async updateUser(id: number, data: Partial<User>): Promise<User> {
    const user = await this.findOneBy({ id });
    if (!user) {
      throw new HttpException(400, 'User not found');
    }
    return await this.save({ ...data, id });
  }

  async createUser(user: User): Promise<any> {
    const newuser = await this.save(user);
    delete (newuser as any).password;
    return newuser;
  }

  async deleteUser(id: number): Promise<DeleteResult> {
    const user = await this.findOneBy({ id });
    if (!user) {
      throw new HttpException(400, 'User not found');
    }
    return await this.delete(id);
  }

  async findOneWithPermissions(email: string): Promise<User | null> {
    return await this.findOne({
      where: { email },
      relations: [
        'role',
        'role.rolePermissions',
        'role.rolePermissions.permission',
      ],
    });
  }
}
