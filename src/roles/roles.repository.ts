import { DataSource, DeleteResult, Repository } from 'typeorm';
import Role from '../entities/role.entity';
import HttpException from '../execeptions/httpException';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RolesRepository extends Repository<Role> {
  constructor(dataSource: DataSource) {
    super(Role, dataSource.createEntityManager());
  }

  async findByName(name: string): Promise<Role | null> {
    return await this.findOne({ where: { name: name } });
  }

  async findById(id: number): Promise<Role | null> {
    return await this.findOneBy({ id });
  }

  async getAll(): Promise<Role[]> {
    return await this.find();
  }

  async updateRole(id: number, data: Partial<Role>): Promise<Role> {
    const role = await this.findOneBy({ id });
    if (!role) {
      throw new HttpException(400, 'Role not found');
    }
    return await this.save({ ...data, id });
  }

  async createRole(role: string): Promise<Role> {
    return await this.save({ name: role });
  }

  async deleteRole(id: number): Promise<DeleteResult> {
    const role = await this.findOneBy({ id });
    if (!role) {
      throw new HttpException(400, 'Role not found');
    }
    return await this.delete(id);
  }
}
