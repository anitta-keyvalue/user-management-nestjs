import { Injectable } from '@nestjs/common';
import HttpException from '../execeptions/httpException';
import { UsersRepository } from './users.repository';
import User from '../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user-dto';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.usersRepository.findByEmail(createUserDto.email);
    if (user) {
      throw new HttpException(400, 'User with email already existing');
    }
    const newUser = new User();
    newUser.name = createUserDto.name;
    newUser.email = createUserDto.email;
    newUser.password = await bcrypt.hash(createUserDto.password, 10);
    newUser.refreshtoken = 'token';
    return await this.usersRepository.createUser(newUser);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.getAll();
  }

  async findOne(id: string): Promise<User | null> {
    return await this.usersRepository.findById(Number(id));
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findByEmail(email);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findByEmail(
      updateUserDto.email ?? '',
    );
    if (!user) {
      throw new HttpException(400, 'User not found');
    }
    const existingUser = await this.usersRepository.findByEmail(
      updateUserDto.email ?? '',
    );
    if (existingUser) {
      throw new HttpException(400, 'User with email already existing');
    }
    return await this.usersRepository.updateUser(id, updateUserDto);
  }

  async remove(id: number) {
    return await this.usersRepository.deleteUser(id);
  }

  async findOneWithPermissions(email: string): Promise<User | null> {
    return await this.usersRepository.findOneWithPermissions(email);
  }

  async updateRefreshToken(id: number, token: string) {
    return await this.usersRepository.updateRefreshToken(id, token);
  }

  async addRole(userId: number, roleId: number) {
    return await this.usersRepository.addRoleToUser(userId, roleId);
  }

  async removeRole(userId: number, roleId: number) {
    return await this.usersRepository.removeRoleFromUser(userId, roleId);
  }
}
